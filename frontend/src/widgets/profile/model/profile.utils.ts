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

export const getRegisterErrorMessage = (error: unknown) => {
  if (!isBaseQueryError(error)) {
    return "Something went wrong. Please try again.";
  }

  const message = error.data?.message;

  if (Array.isArray(message)) {
    return message[0] ?? "Please check your registration details.";
  }

  if (typeof message === "string") {
    return message;
  }

  return "Unable to create account. Please try again.";
};

export const getPasswordResetErrorMessage = (error: unknown) => {
  if (!isBaseQueryError(error)) {
    return "Something went wrong. Please try again.";
  }

  const message = error.data?.message;

  if (Array.isArray(message)) {
    return message[0] ?? "Please check your password reset details.";
  }

  if (typeof message === "string") {
    return message;
  }

  return "Unable to reset password. Please try again.";
};

export const getProfileActionErrorMessage = (error: unknown) => {
  if (!isBaseQueryError(error)) {
    return "Something went wrong. Please try again.";
  }

  const message = error.data?.message;

  if (Array.isArray(message)) {
    return message[0] ?? "Unable to update profile settings.";
  }

  if (typeof message === "string") {
    return message;
  }

  return "Unable to update profile settings. Please try again.";
};

const isBaseQueryError = (
  error: unknown,
): error is {
  status: number | string;
  data?: { message?: string | string[] };
} => {
  return typeof error === "object" && error !== null && "status" in error;
};

export const formatProfileDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};
