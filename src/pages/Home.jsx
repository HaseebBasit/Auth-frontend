import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, KeyRound, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: Shield,
      title: 'Secure Sign Up',
      desc: 'Create account with strong password hashing using bcrypt.',
    },
    {
      icon: Mail,
      title: 'Email Verification',
      desc: 'Verify your email with a secure 6-digit OTP sent to inbox.',
    },
    {
      icon: Lock,
      title: 'Safe Login',
      desc: 'Only verified users can log in. Your data stays protected.',
    },
    {
      icon: KeyRound,
      title: 'Forgot Password',
      desc: 'Reset password securely via OTP without any hassle.',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb w-[500px] h-[500px] bg-primary-500/25 -top-40 -left-40" />
      <div className="bg-orb w-[400px] h-[400px] bg-accent-500/20 bottom-0 right-0" />
      <div className="bg-orb w-72 h-72 bg-primary-400/15 top-1/3 right-1/4" />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-slate-800/40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SecureAuth</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link to="/dashboard">
                <Button variant="primary" className="!px-5 !py-2.5">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="!px-5 !py-2.5">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" className="!px-5 !py-2.5">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
            <CheckCircle2 size={14} />
            Complete Auth System with OTP
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Forget Password System
            <br />
            <span className="gradient-text">Made Simple & Secure</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Sign up, verify email, login, and reset password — all powered by secure OTP
            verification and bcrypt hashing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/signup">
              <Button className="!px-8 !py-3.5 text-base">
                Get Started
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/forgot-password">
              <Button variant="secondary" className="!px-8 !py-3.5 text-base">
                Forgot Password?
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-6 hover:border-primary-500/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <f.icon size={22} className="text-primary-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-6 text-center text-sm text-slate-500">
        SecureAuth • Forget Password System • Built with ❤️
      </footer>
    </div>
  );
}
