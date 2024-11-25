import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.svg"
              alt="eStore Logo"
              width={48}
              height={48}
              className="mx-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-neutral-900 dark:text-neutral-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {subtitle}
            </p>
          )}
        </div>
        <div className="mt-8 bg-white dark:bg-neutral-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}