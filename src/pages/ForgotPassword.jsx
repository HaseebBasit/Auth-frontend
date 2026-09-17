import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import api from '../api/axios';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useStimport { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import api from '../api/axios';

export default function ForgotPassword() {
  const navigate = useNavigate();

  // ======================================================
  // ==================== STATE ===========================
  // ======================================================

  const [step, setStep] = useState(1);
  // 1 = Email
  // 2 = OTP
  // 3 = New Password

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  // IMPORTANT:
  // Backend /password/verify se resetToken milega.
  // Is token ko password reset ke waqt backend ko bhejna hai.
  const [resetToken, setResetToken] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [countdown, setCountdown] = useState(0);


  // ======================================================
  // ==================== COUNTDOWN =======================
  // ======================================================

  useEffect(() => {
    if (countdown <= 0) return;

    const t = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(t);
  }, [countdown]);


  // ======================================================
  // ==================== SEND RESET OTP ==================
  // ======================================================

  const sendOtp = async () => {
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please enter your registered email');
      return;
    }

    setLoading(true);

    try {
      await api.post('/password/forgot', {
        email: email.trim().toLowerCase(),
      });

      setSuccess('Password reset OTP sent to your email!');

      setStep(2);

      setCountdown(60);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // ======================================================
  // ==================== VERIFY RESET OTP ================
  // ======================================================

  const verifyOtp = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setLoading(true);

    try {

      const { data } = await api.post('/password/verify', {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });


      // ==================================================
      // IMPORTANT
      // Backend resetToken return karta hai.
      // Isko save karna zaroori hai.
      // ==================================================

      if (!data.resetToken) {
        setError('Reset token was not received from server');
        return;
      }

      setResetToken(data.resetToken);


      setSuccess(
        'OTP verified! Now set your new password.'
      );

      setStep(3);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // ======================================================
  // ==================== RESET PASSWORD ==================
  // ======================================================

  const resetPassword = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');


    // Password validation

    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }


    // Confirm password

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    // Reset token check

    if (!resetToken) {
      setError(
        'Reset session expired. Please request a new OTP.'
      );

      setStep(1);

      return;
    }


    setLoading(true);

    try {

      await api.post('/password/reset', {
        email: email.trim().toLowerCase(),
        resetToken: resetToken,
        newPassword: newPassword,
      });


      setSuccess(
        'Password reset successfully! Redirecting to login...'
      );


      // Clear sensitive data

      setResetToken('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');


      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // ======================================================
  // ==================== PAGE TITLES =====================
  // ======================================================

  const titles = {
    1: {
      title: 'Forgot Password',
      subtitle: 'Enter your email to receive reset OTP',
    },

    2: {
      title: 'Verify OTP',
      subtitle: 'Enter the OTP sent to your email',
    },

    3: {
      title: 'New Password',
      subtitle: 'Create a strong new password',
    },
  };


  // ======================================================
  // ==================== UI ==============================
  // ======================================================

  return (
    <AuthLayout
      title={titles[step].title}
      subtitle={titles[step].subtitle}
    >

      {/* ==================================================
          PROGRESS INDICATOR
      ================================================== */}

      <div className="flex items-center justify-center gap-2 mb-6">

        {[1, 2, 3].map((s) => (

          <div
            key={s}
            className="flex items-center gap-2"
          >

            <div
              className={`
                w-8 h-8
                rounded-full
                flex items-center justify-center
                text-sm font-semibold
                transition-all

                ${
                  step >= s
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }
              `}
            >

              {step > s ? (
                <CheckCircle2 size={16} />
              ) : (
                s
              )}

            </div>


            {s < 3 && (

              <div
                className={`
                  w-8 h-0.5

                  ${
                    step > s
                      ? 'bg-primary-500'
                      : 'bg-slate-700'
                  }
                `}
              />

            )}

          </div>

        ))}

      </div>


      {/* ==================================================
          ALERTS
      ================================================== */}

      <Alert
        type="error"
        message={error}
        onClose={() => setError('')}
      />

      <Alert
        type="success"
        message={success}
        onClose={() => setSuccess('')}
      />


      {/* ==================================================
          STEP 1 - EMAIL
      ================================================== */}

      {step === 1 && (

        <div className="space-y-4">

          <Input
            label="Registered Email"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            autoComplete="email"
          />


          <Button
            onClick={sendOtp}
            loading={loading}
            className="w-full"
          >
            Send Reset OTP
          </Button>

        </div>

      )}


      {/* ==================================================
          STEP 2 - OTP
      ================================================== */}

      {step === 2 && (

        <form
          onSubmit={verifyOtp}
          className="space-y-4"
        >

          <div className="text-center mb-2">

            <p className="text-sm text-slate-400">

              OTP sent to{' '}

              <span className="text-primary-400 font-medium">
                {email}
              </span>

            </p>

          </div>


          <Input
            label="Enter 6-digit OTP"
            placeholder="000000"
            icon={KeyRound}
            value={otp}
            onChange={(e) => {

              const v = e.target.value
                .replace(/\D/g, '')
                .slice(0, 6);

              setOtp(v);

              setError('');

            }}
            maxLength={6}
            inputMode="numeric"
            autoComplete="one-time-code"
            className="text-center tracking-[0.5em] text-lg font-semibold"
          />


          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Verify OTP
          </Button>


          <div className="flex items-center justify-between text-sm">

            <button
              type="button"
              onClick={() => {

                setStep(1);
                setOtp('');
                setResetToken('');
                setError('');
                setSuccess('');

              }}
              className="flex items-center gap-1 text-slate-400 hover:text-white"
            >

              <ArrowLeft size={14} />

              Change email

            </button>


            <button
              type="button"
              onClick={sendOtp}
              disabled={countdown > 0 || loading}
              className="
                text-primary-400
                hover:text-primary-300
                disabled:text-slate-500
              "
            >

              {countdown > 0
                ? `Resend in ${countdown}s`
                : 'Resend OTP'
              }

            </button>

          </div>

        </form>

      )}


      {/* ==================================================
          STEP 3 - NEW PASSWORD
      ================================================== */}

      {step === 3 && (

        <form
          onSubmit={resetPassword}
          className="space-y-4"
        >

          {/* New Password */}

          <div className="relative">

            <Input
              label="New Password"
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 8 characters"
              icon={Lock}
              value={newPassword}
              onChange={(e) => {

                setNewPassword(e.target.value);
                setError('');

              }}
              autoComplete="new-password"
            />


            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="
                absolute
                right-3.5
                top-[38px]
                text-slate-400
                hover:text-slate-200
              "
            >

              {showPass ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}

            </button>

          </div>


          {/* Confirm Password */}

          <Input
            label="Confirm New Password"
            type={showPass ? 'text' : 'password'}
            placeholder="Re-enter new password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => {

              setConfirmPassword(e.target.value);
              setError('');

            }}
            autoComplete="new-password"
          />


          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            Reset Password
          </Button>

        </form>

      )}


      {/* ==================================================
          BACK TO LOGIN
      ================================================== */}

      <p className="text-center text-sm text-slate-400 mt-6">

        <Link
          to="/login"
          className="
            text-primary-400
            hover:text-primary-300
            font-medium
          "
        >
          ← Back to Login
        </Link>

      </p>

    </AuthLayout>
  );
}ate(1); // 1=email, 2=otp, 3=new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const sendOtp = async () => {
    setError('');
    setSuccess('');
    if (!email.trim()) {
      setError('Please enter your registered email');
      return;
    }
    setLoading(true);
    try {
      await api.post('/password/forgot', { email: email.trim().toLowerCase() });
      setSuccess('Password reset OTP sent to your email!');
      setStep(2);
      setCountdown(60);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }
    setLoading(true);
    try {
      await api.post('/password/verify', {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });
      setSuccess('OTP verified! Now set your new password.');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!newPassword || newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/password/reset', {
        email: email.trim().toLowerCase(),
        newPassword,
      });
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const titles = {
    1: { title: 'Forgot Password', subtitle: 'Enter your email to receive reset OTP' },
    2: { title: 'Verify OTP', subtitle: 'Enter the OTP sent to your email' },
    3: { title: 'New Password', subtitle: 'Create a strong new password' },
  };

  return (
    <AuthLayout title={titles[step].title} subtitle={titles[step].subtitle}>
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step >= s
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}
            >
              {step > s ? <CheckCircle2 size={16} /> : s}
            </div>
            {s < 3 && (
              <div
                className={`w-8 h-0.5 ${
                  step > s ? 'bg-primary-500' : 'bg-slate-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={success} onClose={() => setSuccess('')} />

      {step === 1 && (
        <div className="space-y-4">
          <Input
            label="Registered Email"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <Button onClick={sendOtp} loading={loading} className="w-full">
            Send Reset OTP
          </Button>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={verifyOtp} className="space-y-4">
          <div className="text-center mb-2">
            <p className="text-sm text-slate-400">
              OTP sent to <span className="text-primary-400 font-medium">{email}</span>
            </p>
          </div>
          <Input
            label="Enter 6-digit OTP"
            placeholder="000000"
            icon={KeyRound}
            value={otp}
            onChange={(e) => {
              const v = e.target.value.replace(/\D/g, '').slice(0, 6);
              setOtp(v);
              setError('');
            }}
            maxLength={6}
          />
          <Button type="submit" loading={loading} className="w-full">
            Verify OTP
          </Button>
          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-slate-400 hover:text-white"
            >
              <ArrowLeft size={14} /> Change email
            </button>
            <button
              type="button"
              onClick={sendOtp}
              disabled={countdown > 0 || loading}
              className="text-primary-400 hover:text-primary-300 disabled:text-slate-500"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={resetPassword} className="space-y-4">
          <div className="relative">
            <Input
              label="New Password"
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              icon={Lock}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError('');
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-200"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <Input
            label="Confirm New Password"
            type={showPass ? 'text' : 'password'}
            placeholder="Re-enter new password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError('');
            }}
          />
          <Button type="submit" loading={loading} className="w-full">
            Reset Password
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-slate-400 mt-6">
        <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
          ← Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}
