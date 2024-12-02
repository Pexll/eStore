import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

interface ConfirmationModalProps {
  onConfirm: () => void;
}

export default function ConfirmationModal({ onConfirm }: ConfirmationModalProps) {
  const [confirmationCode, setConfirmationCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleConfirmationCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCode = [...confirmationCode];
    newCode[index] = e.target.value;
    setConfirmationCode(newCode);

    if (e.target.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirmClick = async () => {
    if (confirmationCode.join("").length === 6) {
      setIsLoading(true);
      await onConfirm();
      setIsLoading(false);
      setIsConfirmed(true);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...pastedCode].map((char) => char.toUpperCase());
    setConfirmationCode(newCode);
    inputRefs.current[newCode.length - 1]?.focus();
  };

  const handleResendCode = () => {
    // Logic to resend the confirmation code
    setCountdown(60);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 max-w-md mx-auto border border-neutral-200 dark:border-neutral-700"
        >
          <div className="flex items-center justify-center mb-6">
            <EnvelopeIcon className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Confirm your email</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-center">
            We've sent a confirmation code to your email. Please enter it below to complete your registration.
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            {confirmationCode.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleConfirmationCodeChange(e, index)}
                onPaste={handlePaste}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
                className="w-12 h-12 text-2xl text-center rounded-lg border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-neutral-800 dark:text-neutral-100 transition duration-200 ease-in-out"
              />
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirmClick}
            className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={confirmationCode.join("").length !== 6}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              "Confirm"
            )}
          </motion.button>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-4">
            Didn't receive the code?{" "}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleResendCode}
              disabled={countdown > 0}
              className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
            </motion.button>
          </p>
          <AnimatePresence>
            {isConfirmed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="text-green-500 text-center mt-4"
              >
                Your email has been confirmed!
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 