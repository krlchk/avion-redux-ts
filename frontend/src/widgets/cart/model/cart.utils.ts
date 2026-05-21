export const formatCartPrice = (price: number) => {
  return `$${price.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
};

export const getCreateOrderErrorMessage = (error: unknown) => {
  if (!isBaseQueryError(error)) {
    return "Something went wrong. Please try again.";
  }

  if (error.status === 401) {
    return "Please sign in before checkout.";
  }

  const message = error.data?.message;

  if (Array.isArray(message)) {
    return message[0] ?? "Please check your order details.";
  }

  if (typeof message === "string") {
    return message;
  }

  return "Unable to create order. Please try again.";
};

const isBaseQueryError = (
  error: unknown,
): error is {
  status: number | string;
  data?: { message?: string | string[] };
} => {
  return typeof error === "object" && error !== null && "status" in error;
};
