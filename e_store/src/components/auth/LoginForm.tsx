'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/auth/validation';
import { useAuth } from '@/hooks/auth/useAuth';
import type { LoginCredentials } from '@/types/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { FormContainer, InputField } from '@/components/auth/FormAnimations';

// Add this with other icon components
function GoogleIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// Add this with the other icon components
function AppleIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.05 20.28c-.98.95-2.05.94-3.12.47-1.12-.48-2.14-.48-3.31 0-1.47.62-2.25.44-3.12-.47C3.33 16.09 3.96 9.46 8.37 9.15c1.18.04 2.04.41 2.78.41.74 0 2.13-.49 3.59-.42 1.16.03 2.23.49 3.08 1.37-2.42 1.46-2.03 4.96.58 6.16-.67 1.96-1.57 3.94-3.35 3.61zM15.8 9.1c-.89-1.68-.63-3.86.69-5.18 1.47 1.1 2.23 3.22 1.38 5.18h-2.07z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    const response = await login(data);
    if (response) {
      router.push('/dashboard'); // Redirect to dashboard after successful login
    }
  };

  // Social login handlers
  const handleSocialLogin = (provider: string) => {
    // Implement social login logic
  };

  return (
    <FormContainer>
      {/* Social Login Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('google')}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-all duration-200"
          >
            <GoogleIcon className="w-5 h-5" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Google</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('apple')}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200"
          >
            <AppleIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Apple</span>
          </motion.button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200 dark:border-neutral-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
              or continue with
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        {/* Login Method Toggle */}
        <div className="bg-neutral-100/50 dark:bg-neutral-800/50 p-1 rounded-lg flex">
          {['email', 'phone'].map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setLoginMethod(method as 'email' | 'phone')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                loginMethod === method
                  ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {method.charAt(0).toUpperCase() + method.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {loginMethod === 'email' ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <InputField
                label="Email address"
                {...register('email')}
                type="email"
                placeholder="example@gmail.com"
                error={errors.email?.message}
                className="bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 focus:border-primary-500 dark:focus:border-primary-400"
              />
              
              <div className="relative">
                <InputField
                  label="Password"
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  error={errors.password?.message}
                  className="bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 focus:border-primary-500 dark:focus:border-primary-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <InputField
                label="Phone number"
                type="tel"
                placeholder="+233 XXX XXX XXX"
                className="bg-neutral-50 dark:bg-neutral-800/50 border-neutral-200 dark:border-neutral-700 focus:border-primary-500 dark:focus:border-primary-400"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 dark:border-neutral-600 dark:bg-neutral-800"
            />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Forgot password?
          </Link>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingSpinner className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Sign in</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </motion.button>
      </form>
    </FormContainer>
  );
}

// Icon Components
function EyeIcon({ className = "h-6 w-6" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

function EyeOffIcon({ className = "h-6 w-6" }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );
}

function LoadingSpinner({ className = "h-6 w-6" }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}