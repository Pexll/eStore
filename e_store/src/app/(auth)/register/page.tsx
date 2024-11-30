"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { motion } from "framer-motion";
// import Image from "next/image";

// Icons components to prevent undefined errors
const CheckIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const GuaranteeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path
      fillRule="evenodd"
      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const SupportIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckmarkIcon = () => (
  <svg className="w-4 h-4 text-success-500" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative orbs/blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-400 to-primary-600 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        className="absolute bottom-[-30%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary-600 to-success-500 blur-3xl"
      />

      {/* Trust indicators */}
      <div className="absolute top-4 left-0 right-0 flex justify-center space-x-8 text-sm text-neutral-600 dark:text-neutral-400">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-2"
        >
          <CheckIcon />
          <span>Secure Checkout</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center space-x-2"
        >
          <GuaranteeIcon />
          <span>Money-back Guarantee</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center space-x-2"
        >
          <SupportIcon />
          <span>24/7 Support</span>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <AuthLayout title="Create an account" subtitle="Get started with your free account today.">
          <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-lg rounded-xl">
            <RegisterForm />
          </div>

          {/* Benefits list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-sm text-neutral-600 dark:text-neutral-400"
          >
            <h3 className="font-medium text-neutral-900 dark:text-neutral-200 mb-3">Why choose our store?</h3>
            <ul className="space-y-2">
              {["Exclusive member discounts", "Early access to sales", "Free shipping on first order"].map(
                (benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckmarkIcon />
                    <span>{benefit}</span>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        </AuthLayout>
      </div>
    </div>
  );
}
