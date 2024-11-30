"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormContainer, InputField } from "@/components/auth/FormAnimations";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/auth/validation";
import { useAuth } from "@/hooks/auth/useAuth";
import type { RegisterData } from "@/types/auth";

// Add Icon Components
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

function LoadingSpinner({ className = "h-6 w-6" }) {
  return (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Update your types in @/types/auth.ts
interface Notifications {
  marketing: boolean;
  updates: boolean;
  security: boolean;
}

interface ExtendedRegisterData extends RegisterData {
  phone?: string;
  notifications?: Notifications;
}

const steps = [
  { id: "account", title: "Account Details" },
  { id: "personal", title: "Personal Info" },
  { id: "preferences", title: "Preferences" },
];

export default function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<ExtendedRegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      notifications: {
        marketing: false,
        updates: false,
        security: false,
      },
    },
  } as const);

  const watchedFields = watch();

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return (
          !!watchedFields.email &&
          !!watchedFields.password &&
          !!watchedFields.confirmPassword &&
          !errors.email &&
          !errors.password &&
          !errors.confirmPassword
        );
      case 1:
        return !!watchedFields.firstName && !!watchedFields.lastName && !errors.firstName && !errors.lastName;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onSubmit = async (data: ExtendedRegisterData) => {
    const response = await registerUser(data);
    if (response) {
      router.push("/dashboard");
    }
  };

  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="account"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            <InputField
              label="Email address"
              {...register("email")}
              type="email"
              error={errors.email?.message}
              placeholder="you@example.com"
            />

            <div className="relative">
              <InputField
                label="Password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                error={errors.password?.message}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9">
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            <div className="relative">
              <InputField
                label="Confirm Password"
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                error={errors.confirmPassword?.message}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9"
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            key="personal"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First name"
                {...register("firstName")}
                error={errors.firstName?.message}
                placeholder="John"
              />
              <InputField
                label="Last name"
                {...register("lastName")}
                error={errors.lastName?.message}
                placeholder="Doe"
              />
            </div>
            <InputField
              label="Phone number"
              {...register("phone")}
              type="tel"
              error={errors.phone?.message}
              placeholder="+233 XXX XXX XXX"
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="preferences"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            className="space-y-4"
          >
            {/* Add your preferences fields here */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Notifications</label>
              <div className="space-y-2">
                {["marketing", "updates", "security"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(
                        `notifications.${type}` as
                          | "notifications.marketing"
                          | "notifications.updates"
                          | "notifications.security"
                      )}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 dark:border-neutral-600 dark:bg-neutral-800"
                    />
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                      {type.charAt(0).toUpperCase() + type.slice(1)} notifications
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <FormContainer>
      {/* Progress indicator with enhanced styling */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                  index <= currentStep
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white scale-110"
                    : "bg-white text-neutral-400 dark:bg-neutral-800"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm mt-3 font-medium text-neutral-800 dark:text-neutral-200">{step.title}</span>
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-[60px] w-[calc(100%-20px)] h-[2px] bg-neutral-200 dark:bg-neutral-700 -z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl p-6 border border-neutral-100 dark:border-neutral-800">
          <AnimatePresence mode="wait">{renderStep(currentStep)}</AnimatePresence>
        </div>
        <div>
          Already have an account?{" "}
          <Link
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            href={"/login"}
          >
            Login
          </Link>
        </div>
        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <motion.button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-all duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </motion.button>
          )}
          <motion.button
            type={currentStep === steps.length - 1 ? "submit" : "button"}
            onClick={() => (currentStep < steps.length - 1 ? handleNext() : undefined)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-lg flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isStepValid(currentStep)}
          >
            <span>{currentStep === steps.length - 1 ? "Create Account" : "Continue"}</span>
            {!isLoading && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {isLoading && <LoadingSpinner className="w-5 h-5" />}
          </motion.button>
        </div>
      </form>
    </FormContainer>
  );
}
