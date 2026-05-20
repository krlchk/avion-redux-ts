export interface ContactUsFormValues {
  email: string;
  name: string;
  phone: string;
  message: string;
}

export type ContactUsFormErrors = Partial<Record<keyof ContactUsFormValues, string>>;