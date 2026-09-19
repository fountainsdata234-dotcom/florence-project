import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDmoBcNBZKQ1-kpUtGDWXlnFPU-wPYhSLs',
  authDomain: 'florida-cf707.firebaseapp.com',
  projectId: 'florida-cf707',
  storageBucket: 'florida-cf707.firebasestorage.app',
  messagingSenderId: '514150328871',
  appId: '1:514150328871:web:c111b4cafac63e3896fc02',
  measurementId: 'G-FMBHRFM9W6',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);