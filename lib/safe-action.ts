import { DEFAULT_SERVER_ERROR, createSafeActionClient } from 'next-safe-action';

class MyCustomError extends Error {}

export const action = createSafeActionClient({
  handleReturnedServerError(error) {
    if (error instanceof MyCustomError) {
      return error.message;
    }

    return DEFAULT_SERVER_ERROR;
  },
});
