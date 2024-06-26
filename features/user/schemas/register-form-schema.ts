import { object, string } from 'zod';
import { VALIDATION_CONSTANTS } from './utils';

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
