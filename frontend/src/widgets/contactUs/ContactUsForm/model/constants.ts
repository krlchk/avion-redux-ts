import { ContactUsFormErrors, ContactUsFormValues } from "./types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\-\s\d]{7,20}$/;

export const trimContactUsFormValues = ({
  email,
  name,
  phone,
  message,
}: ContactUsFormValues) => ({
  email: email.trim(),
  name: name.trim(),
  phone: phone.trim(),
  message: message.trim(),
});

export const validateContactUsForm = ({
  email,
  name,
  phone,
  message,
}: ContactUsFormValues) => {
  const errors: ContactUsFormErrors = {};

  if (name.length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phonePattern.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (message.length < 10) {
    errors.message = "Please write at least 10 characters.";
  }

  return errors;
};
