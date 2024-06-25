import { object, string } from 'zod';
import { VALIDATION_CONSTANTS } from './utils';

export const EMAIL_VERIFICATION_DEFAULT_VALUES = {
  code: '',
};

export const EMAIL_VERIFICATION_FORM_SCHEMA = object({
  code: string().min(VALIDATION_CONSTANTS.MIN_EMAIL_VERIFICATION_CODE_LENGTH, { message: VALIDATION_CONSTANTS.EMAIL_VERIFICATION_CODE_MESSAGE }),
});
