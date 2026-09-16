import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim() || !form.password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/user/login', {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });
      login(data.user);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.message;
      if (msg.includes('verify your email')) {
        setError(msg);
        // Offer to go to verify
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Log in to your account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Alert type="error" message={error} onClose={() => setError('')} />

        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
        />

        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPass ? 'text' : 'password'}
            placeholder="Your password"
            icon={Lock}
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-[38px] text-slate-400 hover:text-slate-200"
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm text-primary-400 hover:text-primary-300 font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" loading={loading} className="w-full">
          Log In
        </Button>
      </form>

      <p className="text-center text-sm text-slate-400 mt-6">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary-400 hover:text-primary-300 font-medium">
          Sign Up
        </Link>
      </p>

      {error && error.includes('verify') && (
        <p className="text-center text-sm mt-3">
          <Link
            to="/verify-email"
            state={{ email: form.email }}
            className="text-accent-400 hover:underline"
          >
            Verify your email now →
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}
