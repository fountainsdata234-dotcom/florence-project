import React, { useEffect, useRef, useState } from 'react';
import {
  MultiFactorResolver,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  RecaptchaVerifier,
  User,
  createUserWithEmailAndPassword,
  getMultiFactorResolver,
  multiFactor,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';
import { UserProfile } from '../types';
import { CountryCode, getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { AlertCircle, ArrowRight, CheckCircle2, Lock, LogOut, Mail, Phone, ShieldCheck, User as UserIcon, X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserChange: (user: UserProfile | null) => void;
  initialMode?: 'signin' | 'signup' | 'phone';
}

type AuthMode = 'signin' | 'signup' | 'email-check' | 'enroll-phone' | 'sms-check' | 'profile';

const countryCodes = getCountries();
const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });
const countryFlag = (country: CountryCode) => country.replace(/./g, (letter) => String.fromCodePoint(letter.charCodeAt(0) + 127397));

const toProfile = (user: User): UserProfile => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || 'Florid Shopper',
  photoURL: user.photoURL,
  phone: user.phoneNumber || '',
  twoFactorEnabled: multiFactor(user).enrolledFactors.length > 0,
  twoFactorVerified: true,
});

const readableError = (error: unknown) => {
  const code = (error as { code?: string })?.code;
  if (!navigator.onLine || code === 'auth/network-request-failed') {
    return 'You appear to be offline. Reconnect to the internet and try again.';
  }
  const messages: Record<string, string> = {
    'auth/invalid-credential': 'The email or password is incorrect.',
    'auth/email-already-in-use': 'An account already exists for this email.',
    'auth/weak-password': 'Choose a stronger password with at least six characters.',
    'auth/invalid-phone-number': 'Enter a valid phone number with country code.',
    'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
    'auth/quota-exceeded': 'SMS quota reached for this account. Please try again later.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled in the active account project. Check Email/Password, Phone, and SMS MFA settings.',
    'auth/unauthorized-domain': 'This website domain is not authorized for sign-in yet.',
  };
  return (code && messages[code]) || (error as { message?: string })?.message || 'Authentication failed.';
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, currentUser, onUserChange, initialMode = 'signin' }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode === 'phone' ? 'enroll-phone' : initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState<CountryCode>('US');
  const [smsCode, setSmsCode] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [resolver, setResolver] = useState<MultiFactorResolver | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const recaptcha = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => onAuthStateChanged(auth, (user: User | null) => {
    setAuthReady(true);
    onUserChange(user ? toProfile(user) : null);
    if (user && multiFactor(user).enrolledFactors.length === 0) {
      setPendingUser(user);
      setMode('enroll-phone');
    }
  }), [onUserChange]);
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      setMode(currentUser ? initialMode === 'phone' ? 'enroll-phone' : 'profile' : initialMode === 'phone' ? 'enroll-phone' : initialMode);
    }
  }, [isOpen, currentUser, initialMode]);
  useEffect(() => () => recaptcha.current?.clear(), []);

  const getRecaptcha = () => {
    if (!recaptcha.current) {
      const container = document.getElementById('phone-recaptcha');
      if (container) container.replaceChildren();
      recaptcha.current = new RecaptchaVerifier(auth, 'phone-recaptcha', {
        size: 'invisible',
        'expired-callback': () => {
          recaptcha.current?.clear();
          recaptcha.current = null;
        },
      });
    }
    return recaptcha.current;
  };
  const finish = (user: User) => {
    onUserChange(toProfile(user));
    setSuccess('You are signed in securely.');
    setTimeout(onClose, 700);
  };


  const signIn = async (event: React.FormEvent) => {
    event.preventDefault(); setLoading(true); setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (!result.user.emailVerified) {
        await sendEmailVerification(result.user);
        setPendingUser(result.user); setMode('email-check'); setSuccess('A verification link was sent to your email.');
      } else if (multiFactor(result.user).enrolledFactors.length) finish(result.user);
      else { setPendingUser(result.user); setMode('enroll-phone'); }
    } catch (authError: unknown) {
      if ((authError as { code?: string })?.code === 'auth/multi-factor-auth-required') {
        setResolver(getMultiFactorResolver(auth, authError as Parameters<typeof getMultiFactorResolver>[1])); setMode('sms-check');
      } else setError(readableError(authError));
    } finally { setLoading(false); }
  };

  const signUp = async (event: React.FormEvent) => {
    event.preventDefault(); setLoading(true); setError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name || 'Florid Shopper' });
      await sendEmailVerification(result.user);
      setPendingUser(result.user); setMode('email-check'); setSuccess('A verification link was sent to your email.');
    } catch (authError: unknown) { setError(readableError(authError)); }
    finally { setLoading(false); }
  };

  const sendSms = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); setError(null);
    await auth.authStateReady();
    const user = pendingUser || auth.currentUser;
    if (!user) {
      setError('Your account session is not ready. Please sign in again and retry.');
      setLoading(false);
      return;
    }
    setPendingUser(user);
    try {
      const localDigits = phoneNumber.replace(/\D/g, '').replace(/^0+/, '');
      if (localDigits.length < 4) throw new Error('Enter a valid phone number.');
      const fullPhoneNumber = `+${getCountryCallingCode(country)}${localDigits}`;
      const session = await multiFactor(user).getSession();
      const id = await new PhoneAuthProvider(auth).verifyPhoneNumber({ phoneNumber: fullPhoneNumber, session }, getRecaptcha());
      setVerificationId(id); setMode('sms-check'); setSuccess('A verification code was sent by SMS.');
    } catch (authError: unknown) {
      recaptcha.current?.clear();
      recaptcha.current = null;
      document.getElementById('phone-recaptcha')?.replaceChildren();
      setError(readableError(authError));
    }
    finally { setLoading(false); }
  };

  const verifySms = async (event: React.FormEvent) => {
    event.preventDefault(); setLoading(true); setError(null);
    try {
      if (!verificationId) throw new Error('Request a new SMS code.');
      const credential = PhoneAuthProvider.credential(verificationId, smsCode);
      if (resolver) {
        const result = await resolver.resolveSignIn(PhoneMultiFactorGenerator.assertion(credential)); finish(result.user);
      } else if (pendingUser) {
        await multiFactor(pendingUser).enroll(PhoneMultiFactorGenerator.assertion(credential), 'Florid mobile'); finish(pendingUser);
      }
    } catch (authError: unknown) { setError(readableError(authError)); }
    finally { setLoading(false); }
  };

  const continueAfterEmailVerification = async () => {
    if (!pendingUser) return;
    setLoading(true); setError(null);
    try {
      await pendingUser.reload();
      if (!pendingUser.emailVerified) {
        setError('Verify your email using the link we sent, then try again.');
        return;
      }
      setMode('enroll-phone');
      setSuccess('Now enter your phone number to receive an SMS code.');
    } catch (authError: unknown) { setError(readableError(authError)); }
    finally { setLoading(false); }
  };

  const restartAuthentication = () => {
    setPendingUser(null);
    setResolver(null);
    setVerificationId(null);
    setPhoneNumber('');
    setSmsCode('');
    setError(null);
    setSuccess(null);
    setMode('signin');
  };

  const logout = async () => { await signOut(auth); onUserChange(null); onClose(); };

  if (!isOpen) return null;
  const title = mode === 'profile' ? 'Account Profile' : mode === 'email-check' ? 'Verify Your Email' : mode === 'enroll-phone' ? 'Verify Your Phone' : mode === 'sms-check' ? 'Enter SMS Code' : mode === 'signup' ? 'Create Your Account' : 'Welcome Back';
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
    <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="bg-slate-900 p-6 text-white relative"><button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button><div className="flex items-center gap-2 text-xs font-semibold"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Florid Secure Account</div><h2 className="text-xl font-bold mt-3">{title}</h2><p className="text-xs text-slate-300 mt-1">Your email and phone are verified securely.</p></div>
      <div className="p-6">
        {error && <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex gap-2"><AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span></div>}
        {success && <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex gap-2"><CheckCircle2 className="w-4 h-4 shrink-0" /><span>{success}</span></div>}
        {mode === 'profile' && currentUser && <div className="space-y-4"><div className="p-4 rounded-xl bg-slate-50"><h3 className="font-semibold">{currentUser.displayName}</h3><p className="text-xs text-slate-500">{currentUser.email}</p><p className="text-xs text-emerald-600 mt-2">SMS verification active</p></div><button onClick={logout} className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 flex justify-center gap-2"><LogOut className="w-4 h-4" /> Sign Out</button></div>}
        {mode === 'email-check' && <div className="space-y-4 text-center"><Mail className="w-10 h-10 text-slate-700 mx-auto" /><p className="text-sm text-slate-600">A verification link was sent to <strong>{pendingUser?.email}</strong>. Verify your email before adding phone security.</p><button onClick={continueAfterEmailVerification} disabled={loading} className="w-full py-2.5 rounded-xl bg-slate-900 text-white">{loading ? 'Checking...' : 'I verified my email'}</button></div>}
        {mode === 'enroll-phone' && <form onSubmit={sendSms} className="space-y-4"><p className="text-xs text-slate-600">Choose your country, enter your local number, and we will send a 6-digit SMS code.</p><div className="flex gap-2"><select aria-label="Country calling code" value={country} onChange={(event) => setCountry(event.target.value as CountryCode)} className="w-[42%] min-w-0 rounded-xl border border-slate-300 bg-white px-2 py-2.5 text-sm"><option value="US">🇺🇸 United States (+1)</option>{countryCodes.filter((item) => item !== 'US').map((item) => <option key={item} value={item}>{countryFlag(item)} {countryNames.of(item) || item} (+{getCountryCallingCode(item)})</option>)}</select><Field icon={<Phone />} type="tel" value={phoneNumber} onChange={setPhoneNumber} placeholder="Phone number" /></div><button type="submit" disabled={loading || !authReady} className="w-full py-2.5 rounded-xl bg-slate-900 text-white">{loading ? 'Sending SMS...' : !authReady ? 'Restoring account...' : 'Send SMS Code'} <ArrowRight className="inline w-4 h-4" /></button><button type="button" onClick={restartAuthentication} className="w-full text-xs font-medium text-slate-500 hover:text-slate-900">Back to sign in and try again</button></form>}
        {mode === 'sms-check' && <form onSubmit={verifySms} className="space-y-4"><p className="text-xs text-slate-600">Enter the 6-digit code sent to your phone. The code is never displayed here.</p><Field type="text" value={smsCode} onChange={(value) => setSmsCode(value.replace(/\D/g, ''))} placeholder="6-digit code" /><button disabled={loading} className="w-full py-2.5 rounded-xl bg-slate-900 text-white">{loading ? 'Verifying...' : 'Verify SMS Code'} <ArrowRight className="inline w-4 h-4" /></button></form>}
        {mode === 'signin' && <form onSubmit={signIn} className="space-y-4"><Field icon={<Mail />} type="email" value={email} onChange={setEmail} placeholder="you@example.com" /><Field icon={<Lock />} type="password" value={password} onChange={setPassword} placeholder="Password" /><button disabled={loading} className="w-full py-2.5 rounded-xl bg-slate-900 text-white">{loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="inline w-4 h-4" /></button><button type="button" onClick={() => setMode('signup')} className="w-full text-xs text-slate-500">Create a new account</button></form>}
        {mode === 'signup' && <form onSubmit={signUp} className="space-y-4"><Field icon={<UserIcon />} type="text" value={name} onChange={setName} placeholder="Full name" /><Field icon={<Mail />} type="email" value={email} onChange={setEmail} placeholder="you@example.com" /><Field icon={<Lock />} type="password" value={password} onChange={setPassword} placeholder="At least 6 characters" /><button disabled={loading} className="w-full py-2.5 rounded-xl bg-slate-900 text-white">{loading ? 'Creating account...' : 'Create Account'} <ArrowRight className="inline w-4 h-4" /></button><button type="button" onClick={() => setMode('signin')} className="w-full text-xs text-slate-500">Already have an account? Sign in</button></form>}
      </div><div id="phone-recaptcha" />
    </div>
  </div>;
};

const Field = ({ icon, type, value, onChange, placeholder }: { icon?: React.ReactNode; type: string; value: string; onChange: (value: string) => void; placeholder: string }) => <div className="relative">{icon && <span className="absolute left-3 top-3 w-4 h-4 text-slate-400">{icon}</span>}<input type={type} required value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={`w-full ${icon ? 'pl-9' : 'text-center tracking-widest'} py-2.5 rounded-xl border border-slate-300`} /></div>;
