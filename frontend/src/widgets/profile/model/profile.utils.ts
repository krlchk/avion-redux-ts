export const getLoginErrorMessage = (error: unknown) => {
  if (!isBaseQueryError(error)) {
    return "Something went wrong. Please try again.";
  }

  if (error.status === 401) {
    return "Invalid email or password.";
  }

  const message = error.data?.message;

  if (Array.isArray(message)) {
    return message[0] ?? "Please check your login details.";
  }

  if (typeof message === "string") {
    return message;
  }

  return "Unable to sign in. Please try again.";
};

const isBaseQueryError = (
  error: unknown,
): error is {
  status: number | string;
  data?: { message?: string | string[] };
} => {
  return typeof error === "object" && error !== null && "status" in error;
};
