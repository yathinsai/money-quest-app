import React from 'react';

/**
 * Accessible input field with label, description, prefix/suffix, and error states.
 */
export default function FormField({
  id,
  label,
  value,
  onChange,
  type = 'number',
  min = 0,
  max,
  step = 'any',
  placeholder,
  prefix,
  suffix,
  hint,
  error,
  className = '',
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="block text-sm font-semibold text-slate-800">
          {label}
        </label>
      </div>

      <div className="relative rounded-lg shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 font-medium sm:text-sm">{prefix}</span>
          </div>
        )}
        <input
          id={id}
          type={type}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-describedby={error ? errorId : hintId}
          aria-invalid={Boolean(error)}
          className={`block w-full rounded-lg border py-2 text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 sm:text-sm sm:leading-6 ${
            prefix ? 'pl-8' : 'pl-3'
          } ${suffix ? 'pr-8' : 'pr-3'} ${
            error
              ? 'border-rose-300 bg-rose-50/50 text-rose-900 focus:ring-rose-500'
              : 'border-slate-300 bg-white hover:border-slate-400 focus:border-emerald-600'
          }`}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-slate-500 font-medium sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>

      {hint && !error && (
        <p id={hintId} className="text-xs text-slate-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-xs text-rose-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
