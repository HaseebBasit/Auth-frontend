import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Alert({ type = 'error', message, onClose }) {
  if (!message) return null;

  const styles = {
    error: {
      bg: 'bg-red-500/10 border-red-500/30 text-red-300',
      icon: <AlertCircle size={18} className="text-red-400 shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      icon: <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />,
    },
  };

  const style = styles[type] || styles.error;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex items-start gap-3 p-4 rounded-xl border ${style.bg}`}
      >
        {style.icon}
        <p className="text-sm flex-1 leading-relaxed">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
