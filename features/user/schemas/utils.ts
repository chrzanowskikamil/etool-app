export interface ValidateConstants {
  EMAIL_VERIFICATION_CODE_MESSAGE: string;
  MIN_EMAIL_VERIFICATION_CODE_LENGTH: number;
  MIN_FIRST_NAME_LENGTH: number;
  MAX_FIRST_NAME_LENGTH: number;
  MIN_PASSWORD_LENGTH: number;
  MAX_LAST_NAME_LENGTH: number;
  MAX_PASSWORD_LENGTH: number;
  REQUIRED_FIELD_MESSAGE: string;
  PASSWORD_MIN_LENGTH_MESSAGE: string;
  PASSWORD_NOT_MATCH_MESSAGE: string;
}

export const VALIDATION_CONSTANTS: ValidateConstants = {
  EMAIL_VERIFICATION_CODE_MESSAGE: 'Your code must be 4 digits.',
  MIN_EMAIL_VERIFICATION_CODE_LENGTH: 4,
  MIN_FIRST_NAME_LENGTH: 2,
  MAX_FIRST_NAME_LENGTH: 30,
  MIN_PASSWORD_LENGTH: 8,
  MAX_LAST_NAME_LENGTH: 50,
  MAX_PASSWORD_LENGTH: 100,
  REQUIRED_FIELD_MESSAGE: 'This field is required',
  PASSWORD_MIN_LENGTH_MESSAGE: 'Password must be at least 8 characters long',
  PASSWORD_NOT_MATCH_MESSAGE: 'Passwords do not match',
};
