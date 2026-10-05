import React, { useState } from 'react';
import { User } from '../types/campus';
import { localStorageService, SEED_USERS } from '../services/localStorageService';
import { VelsBuildingLogo } from './VelsBuildingLogo';
import { CAMPUS_IMAGES } from '../assets/images';
import { showToast } from './Toast';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  X,
  CheckCircle2,
  KeyRound,
  AlertCircle,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('student@vels.edu.in');
  const [password, setPassword] = useState('student123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const allUsers = localStorageService.getAllUsers();
      const matched = allUsers.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() ||
          u.name.toLowerCase().includes(email.trim().toLowerCase())
      );

      if (matched) {
        localStorageService.setSession(matched);
        showToast(`Welcome back, ${matched.name}!`, 'success');
        onLoginSuccess(matched);
        onClose();
      } else {
        const newUser: User = {
          id: `user_${Date.now()}`,
          name: email.split('@')[0],
          email: email.trim(),
          role: email.toLowerCase().includes('admin')
            ? 'admin'
            : email.toLowerCase().includes('dept')
            ? 'department'
            : 'student',
          avatar: email.charAt(0).toUpperCase(),
        };
        localStorageService.setSession(newUser);
        showToast(`Signed in as ${newUser.name}`, 'success');
        onLoginSuccess(newUser);
        onClose();
      }
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const studentUser = SEED_USERS[0];
      localStorageService.setSession(studentUser);
      showToast(`Signed in with Google as ${studentUser.name}!`, 'success');
      onLoginSuccess(studentUser);
      onClose();
    }, 700);
  };

  const handleSelectDemoAccount = (role: 'student' | 'department' | 'admin') => {
    if (role === 'student') {
      setEmail('student@vels.edu.in');
      setPassword('student123');
    } else if (role === 'department') {
      setEmail('department@vels.edu.in');
      setPassword('dept123');
    } else {
      setEmail('admin@vels.edu.in');
      setPassword('admin123');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      showToast('Please enter your registered email address', 'error');
      return;
    }
    setResetSent(true);
    showToast('Password reset link sent to your university inbox!', 'success');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 dark:bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 min-h-[580px] animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 rounded-full shadow-xs transition-colors cursor-pointer"
          aria-label="Close login dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: VELS Campus Building Photograph */}
        <div className="relative hidden md:block bg-slate-900 overflow-hidden">
          <img
            src={CAMPUS_IMAGES.vertical || CAMPUS_IMAGES.hero}
            alt="VELS Campus Building"
            className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-ping" />
              <span className="text-xs uppercase tracking-widest font-semibold text-blue-200">
                Official Campus Portal
              </span>
            </div>
            <h2 className="text-2xl font-bold font-serif leading-tight">
              VELS Institute of Science, Technology & Advanced Studies
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Empowering students & faculty with real-time maintenance reporting, proactive estate management, and cleaner campus facilities.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Login Card */}
        <div className="p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-slate-900">
          {!isForgotPassword ? (
            <>
              {/* Branding Header */}
              <div className="text-center sm:text-left mb-6">
                <div className="flex justify-center sm:justify-start mb-3">
                  <VelsBuildingLogo
                    variant="blue"
                    size="md"
                    showText={true}
                    showTagline={false}
                  />
                </div>
                <h1 id="login-modal-title" className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  VELS Campus Care
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Campus Maintenance Reporting System
                </p>
              </div>

              {/* Demo Account Quick Pick Pills */}
              <div className="mb-5 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5 px-1">
                  Demo Fast Sign-In:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelectDemoAccount('student')}
                    className={`px-2 py-1.5 text-xs rounded-xl font-semibold border transition-all cursor-pointer ${
                      email === 'student@vels.edu.in'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-750 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDemoAccount('department')}
                    className={`px-2 py-1.5 text-xs rounded-xl font-semibold border transition-all cursor-pointer ${
                      email === 'department@vels.edu.in'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-750 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    Department
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectDemoAccount('admin')}
                    className={`px-2 py-1.5 text-xs rounded-xl font-semibold border transition-all cursor-pointer ${
                      email === 'admin@vels.edu.in'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white dark:bg-slate-750 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email or Username
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="student@vels.edu.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                    />
                    <span className="text-slate-600 dark:text-slate-400">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase">
                  <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 dark:text-slate-500 font-semibold tracking-wider">or</span>
                </div>
              </div>

              {/* Login with Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Login with Google</span>
              </button>
            </>
          ) : (
            /* Forgot Password Flow */
            <div className="space-y-4">
              <div className="mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-3">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reset Your Password</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enter your VELS university email address and we'll send verification instructions.
                </p>
              </div>

              {resetSent ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Reset instructions dispatched
                  </div>
                  <p>
                    A temporary recovery token has been sent to <b>{resetEmail}</b>. Please check your student inbox.
                  </p>
                  <button
                    onClick={() => {
                      setResetSent(false);
                      setIsForgotPassword(false);
                    }}
                    className="mt-3 px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs cursor-pointer"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      University Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@vels.edu.in"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="w-1/2 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl cursor-pointer shadow-xs"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
