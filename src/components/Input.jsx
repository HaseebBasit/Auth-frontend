import { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', error, icon: Icon, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-slate-800/60 border border-slate-700/50
            text-slate-100 placeholder-slate-500
            transition-all duration-200
            focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
            hover:border-slate-600
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-red-500/70 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
