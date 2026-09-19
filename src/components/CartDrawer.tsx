import React, { useState } from 'react';
import { CartItem, UserProfile } from '../types';
import { GlassImage } from './GlassImage';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  CheckCircle,
  Truck,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  currentUser: UserProfile | null;
  onRequireAuth: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentUser,
  onRequireAuth,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 25 ? 0 : 4.99;
  const discount = subtotal > 60 ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal + shipping - discount);

  const handleCheckout = () => {
    if (!currentUser) {
      onRequireAuth();
      return;
    }

    setIsCheckingOut(true);

    // Simulate checkout order verification
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onClearCart();
        setCheckoutSuccess(false);
        onClose();
      }, 2500);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Your Shopping Cart</h2>
                <span className="text-xs text-slate-500">{cart.length} unique items</span>
              </div>
            </div>

            <button
              onClick={onClose}
              id="close-cart-btn"
              className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {checkoutSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Order Placed Successfully!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs">
                  Your order is confirmed. We have dispatched your receipt to{' '}
                  <span className="font-semibold text-slate-900">{currentUser?.email}</span>.
                </p>
                <div className="p-3 bg-slate-100 rounded-xl text-xs font-mono text-slate-700">
                  Tracking ID: SMW-8930421
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <ShoppingBag className="w-16 h-16 stroke-1 text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">Your cart is empty</p>
                <p className="text-xs text-slate-400 max-w-xs">
                  Discover trending Florid deals to start filling it up!
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold shadow hover:bg-slate-800 transition"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="flex gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-slate-300 transition"
                >
                  <div className="w-20 h-20 shrink-0">
                    <GlassImage
                      src={item.product.image}
                      alt={item.product.title}
                      aspectRatio="square"
                      className="rounded-xl"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-slate-900 truncate pr-2">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-red-600 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-400">
                        {item.selectedColor || 'Florid Slate'} {item.selectedSize ? `• ${item.selectedSize}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Order Summary */}
          {cart.length > 0 && !checkoutSuccess && (
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-slate-400" />
                    Shipping
                  </span>
                  <span>{shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>VIP 10% Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-base">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout security notice */}
              <div className="p-2 rounded-xl bg-slate-200/50 border border-slate-300/60 flex items-center gap-2 text-[11px] text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Buyer protection is active for this payment session.</span>
              </div>

              <button
                id="checkout-proceed-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <>
                    <Lock className="w-4 h-4 animate-spin" />
                    Securing Order...
                  </>
                ) : (
                  <>
                    <span>Proceed to Secure Checkout • ${total.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
