import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const base =
    'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:border-slate-600',
    ghost:
      'bg-transparent text-slate-300 hover:bg-slate-800/50 hover:text-white',
    danger:
      'bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading && <Loader2 size={18} className="animate-spin" />}
      {children}
    </button>
  );
}
