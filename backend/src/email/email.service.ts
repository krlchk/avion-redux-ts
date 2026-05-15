import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import { resetOtpTemplate } from './templates/reset-otp.template';
import { passwordChangedTemplate } from './templates/password-changed.template';
import { welcomeTemplate } from './templates/welcome-registration.template';
import { TwoFactorTemplate } from './templates/two-factor.template';
import { newsletterSubscriptionTemplate } from './templates/newsletter-subscription.template';

@Injectable()
export class EmailService {
  private readonly transporter: Transporter;
  constructor() {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    if (!user || !pass) {
      throw new Error('EMAIL_USER / EMAIL_PASS not set');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });
  }
  async sendResetOtp(email: string, otp: string) {
    const html = resetOtpTemplate(otp);
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      html,
    });
  }
  async sendPasswordChanged(email: string) {
    const html = passwordChangedTemplate();
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Password changed',
      html,
    });
  }
  async welcomeRegistration(email: string, name: string) {
    const html = welcomeTemplate(name);
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome',
      html,
    });
  }
  async send2FaOtp(email: string, otp: string) {
    const html = TwoFactorTemplate(otp);
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      html,
    });
  }
  async sendNewsletterSubscription(email: string) {
    const html = newsletterSubscriptionTemplate();
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to the Avion newsletter',
      html,
    });
  }
}
