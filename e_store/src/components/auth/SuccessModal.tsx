import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  title: string;
  message: string;
  buttonText: string;
  redirectPath: string;
}

export default function SuccessModal({ 
  title, 
  message, 
  buttonText, 
  redirectPath 
}: SuccessModalProps) {
  const router = useRouter();

  return (
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            {message}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(redirectPath)}
            className="w-full py-3 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            {buttonText}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}