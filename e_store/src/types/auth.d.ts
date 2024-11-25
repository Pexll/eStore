export type UserRole = 'USER' | 'ADMIN' | 'MANAGER';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Notifications {
  marketing?: boolean;
  updates?: boolean;
  security?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  notifications?: Notifications;
}

// Extended version for the multi-step form
export interface ExtendedRegisterData extends RegisterData {
  phone?: string;
  notifications?: Notifications;
}