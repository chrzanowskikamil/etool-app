import { VALIDATION_CONSTANTS } from '@/lib/utils';
import { object, string } from 'zod';

export const REGISTER_DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  username: '',
  password: '',
};

export const REGISTER_FORM_SCHEMA = object({
  firstName: string().min(VALIDATION_CONSTANTS.MIN_FIRST_NAME_LENGTH, { message: VALIDATION_CONSTANTS.REQUIRED_FIELD_MESSAGE }).max(VALIDATION_CONSTANTS.MAX_FIRST_NAME_LENGTH),
  lastName: string().min(VALIDATION_CONSTANTS.MIN_FIRST_NAME_LENGTH, { message: VALIDATION_CONSTANTS.REQUIRED_FIELD_MESSAGE }).max(VALIDATION_CONSTANTS.MAX_LAST_NAME_LENGTH),
  username: string().email().toLowerCase(),
  password: string().min(VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH, { message: VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH_MESSAGE }).max(VALIDATION_CONSTANTS.MAX_PASSWORD_LENGTH),
});

export const LOGIN_DEFAULT_VALUES = {
  username: '',
  password: '',
};

export const LOGIN_FORM_SCHEMA = object({
  username: string().email().toLowerCase(),
  password: string().min(VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH, { message: VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH_MESSAGE }).max(VALIDATION_CONSTANTS.MAX_PASSWORD_LENGTH),
});

export const RESET_PASSWORD_DEFAULT_VALUES = {
  username: '',
};

export const RESET_PASSWORD_FORM_SCHEMA = object({
  username: LOGIN_FORM_SCHEMA.shape.username,
});

export const NEW_PASSWORD_DEFAULT_VALUES = {
  password: '',
  confirmPassword: '',
};

export const NEW_PASSWORD_FORM_SCHEMA = object({
  password: LOGIN_FORM_SCHEMA.shape.password,
  confirmPassword: LOGIN_FORM_SCHEMA.shape.password,
}).refine((data) => data.password === data.confirmPassword, { message: VALIDATION_CONSTANTS.PASSWORD_NOT_MATCH_MESSAGE, path: ['confirmPassword'] });
