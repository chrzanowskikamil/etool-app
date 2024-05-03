import { object, string } from 'zod';
import { VALIDATION_CONSTANTS } from '../utils';

export const LOGIN_DEFAULT_VALUES = {
  username: '',
  password: '',
};

export const LOGIN_FORM_SCHEMA = object({
  username: string().email().toLowerCase(),
  password: string().min(VALIDATION_CONSTANTS.MIN_PASSWORD_LENGTH, { message: VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH_MESSAGE }).max(VALIDATION_CONSTANTS.MAX_PASSWORD_LENGTH),
});
