'use client';

import { motion } from 'framer-motion';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = '', ...props }, ref) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-1"
    >
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      <input
        ref={ref}
        {...props}
        className={`
          appearance-none block w-full px-3 py-2 border rounded-md shadow-sm 
          placeholder-neutral-400 transition-all duration-200
          focus:outline-none focus:ring-primary-500 focus:border-primary-500
          dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100
          ${error ? 'border-error-500 animate-shake' : 'border-neutral-300'}
          ${className}
        `}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-error-500"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
);

InputField.displayName = 'InputField';

export const FormContainer = ({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className={`w-full max-w-md mx-auto ${className}`}
  >
    {children}
  </motion.div>
);