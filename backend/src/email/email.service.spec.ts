import { Test, TestingModule } from '@nestjs/testing';
import { ContactMessageDto } from './dto/contact-message.dto';
import { EmailService } from './email.service';

const mockSendMail = jest.fn();

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: jest.fn().mockImplementation(() => ({
      sendMail: mockSendMail,
    })),
  },
}));

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    process.env.EMAIL_USER = 'sender@example.com';
    process.env.EMAIL_PASS = 'email-pass';
    process.env.EMAIL_FROM = 'Avion <hello@example.com>';
    process.env.EMAIL_CONTACT_TO = 'operator@example.com';

    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService],
    }).compile();

    service = module.get<EmailService>(EmailService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.EMAIL_USER;
    delete process.env.EMAIL_PASS;
    delete process.env.EMAIL_FROM;
    delete process.env.EMAIL_CONTACT_TO;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw when email credentials are missing', async () => {
    delete process.env.EMAIL_USER;

    await expect(
      Test.createTestingModule({
        providers: [EmailService],
      }).compile(),
    ).rejects.toThrow('EMAIL_USER / EMAIL_PASS not set');
  });

  it('should send reset otp email', async () => {
    await service.sendResetOtp('user@example.com', '123456');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Avion <hello@example.com>',
        to: 'user@example.com',
        subject: 'Your OTP Code',
        html: expect.stringContaining('123456') as string,
      }),
    );
  });

  it('should send password changed email', async () => {
    await service.sendPasswordChanged('user@example.com');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        subject: 'Password changed',
      }),
    );
  });

  it('should send welcome registration email', async () => {
    await service.welcomeRegistration('user@example.com', 'Kirill');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        subject: 'Welcome',
        html: expect.stringContaining('Kirill') as string,
      }),
    );
  });

  it('should send two-factor otp email', async () => {
    await service.send2FaOtp('user@example.com', '654321');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        subject: 'Your OTP Code',
        html: expect.stringContaining('654321') as string,
      }),
    );
  });

  it('should send newsletter subscription email', async () => {
    await service.sendNewsletterSubscription('user@example.com');

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        subject: 'Welcome to the Avion newsletter',
      }),
    );
  });

  it('should send contact message to operator with replyTo', async () => {
    const dto: ContactMessageDto = {
      name: 'Customer',
      email: 'customer@example.com',
      phone: '+380991234567',
      message: 'Can you help me?',
    };

    await service.sendContactMessage(dto);

    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Avion <hello@example.com>',
        to: 'operator@example.com',
        replyTo: 'customer@example.com',
        subject: 'New contact request from Customer',
        html: expect.stringContaining('Can you help me?') as string,
      }),
    );
  });
});
