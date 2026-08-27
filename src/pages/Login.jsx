// src/pages/Login.jsx
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

function GoogleIcon() {
  return (
    <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function Login() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  // Mode: 'signin' | 'signup' | 'forgot'
  const [mode, setMode] = useState('signin');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Already authenticated — redirect to dashboard
  if (user) return <Navigate to="/dashboard" replace />;

  const cleanState = () => {
    setError('');
    setSuccessMsg('');
  };

  const handleTabChange = (newMode) => {
    cleanState();
    setMode(newMode);
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    cleanState();
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google Auth error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in popup closed.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled in Firebase Console.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('Domain not authorized in Firebase Console settings.');
      } else {
        setError(err.message || 'Google sign-in failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Email/Password Submit
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    cleanState();

    if (!email || (!password && mode !== 'forgot')) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        if (password.length < 6) {
          setError('Password should be at least 6 characters.');
          setLoading(false);
          return;
        }
        await signUpWithEmail(email, password, name.trim() || 'Learner');
      } else if (mode === 'signin') {
        await signInWithEmail(email, password);
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setSuccessMsg('Password reset link sent! Check your inbox.');
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error('Email Auth error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('An account already exists with this email.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password is too weak (min 6 characters).');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err.message || 'Authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.ambientGlowTop} />
      <div className={styles.ambientGlowBottom} />
      <div className={styles.gridPattern} />

      <div className={styles.card}>
        {/* Brand Header */}
        <div className={styles.brandHeader}>
          <div className={styles.logoBadge}>E</div>
          <h1 className={styles.appName}>ELEVATE</h1>
          <p className={styles.tagline}>
            {mode === 'signup'
              ? 'Create your account to start elevating'
              : mode === 'forgot'
              ? 'Reset your password'
              : 'Sign in to continue your growth journey'}
          </p>
        </div>

        {/* Tab Switcher (Sign In vs Create Account) */}
        {mode !== 'forgot' && (
          <div className={styles.tabSwitcher}>
            <button
              type="button"
              className={`${styles.tabBtn} ${mode === 'signin' ? styles.tabBtnActive : ''}`}
              onClick={() => handleTabChange('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${mode === 'signup' ? styles.tabBtnActive : ''}`}
              onClick={() => handleTabChange('signup')}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Error / Success Alerts */}
        {error && (
          <div className={styles.errorAlert}>
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className={styles.successAlert}>
            <CheckCircle2 size={15} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Google One-Click Button */}
        {mode !== 'forgot' && (
          <>
            <button
              type="button"
              className={styles.googleBtn}
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <div className={styles.divider}>
              <div className={styles.dividerLine} />
              <span className={styles.dividerText}>or with email</span>
              <div className={styles.dividerLine} />
            </div>
          </>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleEmailSubmit} className={styles.form}>
          {/* Full Name for Sign Up */}
          {mode === 'signup' && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Your Name</label>
              <div className={styles.inputWrapper}>
                <User size={15} className={styles.inputIcon} />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={15} className={styles.inputIcon} />
              <input
                type="email"
                className={styles.input}
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password (only in signin and signup) */}
          {mode !== 'forgot' && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <Lock size={15} className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={styles.input}
                  placeholder={mode === 'signup' ? 'Min 6 characters' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          )}

          {/* Forgot password row */}
          {mode === 'signin' && (
            <div className={styles.forgotRow}>
              <button
                type="button"
                className={styles.forgotBtn}
                onClick={() => handleTabChange('forgot')}
              >
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <div className={styles.spinner} />
            ) : mode === 'signup' ? (
              <>Create Account <ArrowRight size={14} /></>
            ) : mode === 'forgot' ? (
              'Send Reset Link'
            ) : (
              <>Sign In <ArrowRight size={14} /></>
            )}
          </button>
        </form>

        {/* Back to sign in / switch mode footer */}
        <div className={styles.footer}>
          {mode === 'forgot' ? (
            <span>
              Remembered your password?{' '}
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => handleTabChange('signin')}
              >
                Sign In
              </button>
            </span>
          ) : mode === 'signin' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => handleTabChange('signup')}
              >
                Sign up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                className={styles.footerLink}
                onClick={() => handleTabChange('signin')}
              >
                Sign in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
