import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
});

export const registerSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters'),
  phone: z.string().optional(),
  notifications: z.object({
    marketing: z.boolean().optional().default(false),
    updates: z.boolean().optional().default(false),
    security: z.boolean().optional().default(false),
  }).optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
});