import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, LogOut, User, Mail, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="bg-orb w-96 h-96 bg-primary-500/20 -top-20 -left-20" />
      <div className="bg-orb w-80 h-80 bg-accent-500/15 bottom-0 right-0" />

      {/* Navbar */}
      <nav className="relative z-10 border-b border-slate-800/50 glass">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Shield size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">SecureAuth</span>
          </Link>
          <Button variant="ghost" onClick={handleLogout} className="!px-4 !py-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
              <CheckCircle2 size={16} />
              Authenticated
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome, <span className="gradient-text">{user.name}</span>!
            </h1>
            <p className="text-slate-400">You're successfully logged in to SecureAuth</p>
          </div>

          {/* User Card */}
          <div className="max-w-md mx-auto glass rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-primary-500/30">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-center space-y-3 w-full">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                  <User size={18} className="text-primary-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-slate-500">Name</p>
                    <p className="text-sm font-medium text-slate-200">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
                  <Mail size={18} className="text-primary-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-medium text-slate-200">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
            {[
              { title: 'Secure Login', desc: 'Protected with bcrypt hashing' },
              { title: 'Email Verified', desc: 'OTP-based email verification' },
              { title: 'Password Reset', desc: 'Safe OTP-based recovery' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass rounded-xl p-5 text-center"
              >
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
