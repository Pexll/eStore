"use client";

import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/auth/ConfirmationModal";

export default function ConfirmationPage() {
  const router = useRouter();

  const handleConfirmation = async () => {
    try {
      // Only return true to show success modal, don't redirect here
      return true;
    } catch (error) {
      console.error('Confirmation failed:', error);
      return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ConfirmationModal onConfirm={handleConfirmation} />
    </div>
  );
}