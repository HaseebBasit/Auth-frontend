import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, ArrowLeft } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import api from '../api/axios';

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(location.state?.email ? 2 : 1); // 1=email, 2=otp
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
      setError('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      await api.post('/otp/send', { email: email.trim().toLowerCase() });
      setSuccess('OTP sent to your email!');
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
      await api.post('/otp/verify', {
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
      });
      setSuccess('Email verified successfully! You can now log in.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Email"
      subtitle={step === 1 ? 'Enter your email to receive OTP' : 'Enter the OTP sent to your email'}
    >
      <Alert type="error" message={error} onClose={() => setError('')} />
      <Alert type="success" message={success} onClose={() => setSuccess('')} />

      {step === 1 ? (
        <div className="space-y-4">
          <Input
            label="Email Address"
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
            Send OTP
          </Button>
        </div>
      ) : (
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
            className="text-center tracking-[0.5em] text-lg font-semibold"
          />

          <Button type="submit" loading={loading} className="w-full">
            Verify OTP
          </Button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} /> Change email
            </button>
            <button
              type="button"
              onClick={sendOtp}
              disabled={countdown > 0 || loading}
              className="text-primary-400 hover:text-primary-300 disabled:text-slate-500 disabled:cursor-not-allowed"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>
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
