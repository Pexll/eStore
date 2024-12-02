"use client";

import ConfirmationModal from "@/components/auth/ConfirmationModal";

export default function ConfirmationPage() {
    const handleConfirmation = async () => {
      try {
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