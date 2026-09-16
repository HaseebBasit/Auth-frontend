import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background orbs */}
      <div className="bg-orb w-96 h-96 bg-primary-500/30 -top-20 -left-20" />
      <div className="bg-orb w-80 h-80 bg-accent-500/20 bottom-10 right-10" />
      <div className="bg-orb w-64 h-64 bg-primary-400/20 top-1/2 left-1/2 -translate-x-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-105 transition-transform">
              <Shield size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">SecureAuth</span>
          </Link>
        </div>

        {/* Card */}
        <div className="glass rounded-2xl p-8 shadow-2xl shadow-black/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-white mb-1.5">{title}</h1>
            {subtitle && (
              <p className="text-slate-400 text-sm">{subtitle}</p>
            )}
          </div>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
