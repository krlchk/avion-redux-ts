export const LoginValidation = (email: string, password: string) => {
  const error = {
    emailMessage: "",
    passwordMessage: "",
  };
  const email_patternt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (email === "") {
    error.emailMessage = "Input should not be empty";
  } else if (!email_patternt.test(email)) {
    error.emailMessage = "Email didn't match";
  } else {
    error.emailMessage = "";
  }

  if (password === "") {
    error.passwordMessage = "Input should not be empty";
  } else if (!password_pattern.test(password)) {
    error.passwordMessage =
      "The password must contain (0-9) (a-z) (A-Z) | 8+ symbols";
  } else {
    error.passwordMessage = "";
  }
  return error;
};

export default LoginValidation;
