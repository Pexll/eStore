"use client";

import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/auth/ConfirmationModal";

export default function ConfirmationPage() {
  const router = useRouter();

  const handleConfirmation = () => {
    // Perform any necessary actions after confirmation
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <ConfirmationModal onConfirm={handleConfirmation} />
    </div>
  );
}