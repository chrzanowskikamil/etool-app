import { object } from 'zod';
import { LOGIN_FORM_SCHEMA } from './login-form-schema';
import { VALIDATION_CONSTANTS } from './utils';

export const NEW_PASSWORD_DEFAULT_VALUES = {
  password: '',
  confirmPassword: '',
};

export const NEW_PASSWORD_FORM_SCHEMA = object({
  password: LOGIN_FORM_SCHEMA.shape.password,
  confirmPassword: LOGIN_FORM_SCHEMA.shape.password,
}).refine((data) => data.password === data.confirmPassword, { message: VALIDATION_CONSTANTS.PASSWORD_NOT_MATCH_MESSAGE, path: ['confirmPassword'] });
