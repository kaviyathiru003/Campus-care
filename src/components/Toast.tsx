import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

type ToastListener = (toasts: ToastMessage[]) => void;
let activeToasts: ToastMessage[] = [];
const toastListeners = new Set<ToastListener>();

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  const id = `toast_${Date.now()}_${Math.random()}`;
  const newToast: ToastMessage = { id, message, type };
  activeToasts = [...activeToasts, newToast];
  toastListeners.forEach((l) => l([...activeToasts]));

  setTimeout(() => {
    activeToasts = activeToasts.filter((t) => t.id !== id);
    toastListeners.forEach((l) => l([...activeToasts]));
  }, 3500);
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const listener: ToastListener = (updated) => setToasts(updated);
    toastListeners.add(listener);
    return () => {
      toastListeners.delete(listener);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-lg border text-sm font-medium transition-all transform translate-y-0 opacity-100 ${
            t.type === 'success'
              ? 'bg-emerald-900/95 text-emerald-100 border-emerald-700/60 shadow-emerald-950/20'
              : t.type === 'error'
              ? 'bg-rose-900/95 text-rose-100 border-rose-700/60 shadow-rose-950/20'
              : 'bg-slate-900/95 text-slate-100 border-slate-700/60 shadow-slate-950/20'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <span>{t.message}</span>
          </div>
          <button
            onClick={() => {
              activeToasts = activeToasts.filter((item) => item.id !== t.id);
              toastListeners.forEach((l) => l([...activeToasts]));
            }}
            className="p-1 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
