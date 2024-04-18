import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export enum ROUTES {
  ABOUT = '/about/',
  CONTACT = '/contact/',
  DASHBOARD = '/dashboard/',
  DOCS = '/docs/',
  HELP = '/dashboard/help/',
  HOME = '/',
  LOGIN = '/login/',
  NEW_PASSWORD = '/new-password',
  PROFILE = '/dashboard/profile/',
  REGISTER = '/register/',
  REPORTS = '/dashboard/reports/',
  REVIEWS = '/reviews/',
  RESET_PASSWORD = '/reset-password',
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const VALIDATION_CONSTANTS: ValidateConstantsType = {
  MIN_FIRST_NAME_LENGTH: 2,
  MAX_FIRST_NAME_LENGTH: 30,
  MIN_PASSWORD_LENGTH: 8,
  MAX_LAST_NAME_LENGTH: 50,
  MAX_PASSWORD_LENGTH: 100,
  REQUIRED_FIELD_MESSAGE: 'This field is required',
  PASSWORD_MIN_LENGTH_MESSAGE: 'Password must be at least 8 characters long',
  PASSWORD_NOT_MATCH_MESSAGE: 'Passwords do not match',
};
