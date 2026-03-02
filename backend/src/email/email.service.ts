import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor() {}
  async sendResetOtp(email: string, otp: string) {}
}
