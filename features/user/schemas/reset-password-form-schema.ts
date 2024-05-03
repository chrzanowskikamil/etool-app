import { object } from "zod";
import { LOGIN_FORM_SCHEMA } from "./login-form-schema";

export const RESET_PASSWORD_DEFAULT_VALUES = {
    username: '',
  };
  
  export const RESET_PASSWORD_FORM_SCHEMA = object({
    username: LOGIN_FORM_SCHEMA.shape.username,
  });