import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import AuthLayout from '@/components/auth/AuthLayout';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout 
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a link to reset your password."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}