import {
  BadGatewayException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;
  let fetchMock: jest.MockedFunction<typeof fetch>;

  const prisma = {
    product: {
      findUnique: jest.fn(),
    },
  };

  const product = {
    id: 'product-1',
    title: 'Pouf Drova 4',
    description: 'Decorative sculptural pouf',
    price: 120,
    stock: 4,
    width: 55,
    height: 65,
    depth: 35,
    discountPercent: 10,
    category: { name: 'Poufs' },
    designer: { name: 'Avion Studio' },
    reviews: [{ rating: 4 }, { rating: 5 }],
  };

  beforeEach(async () => {
    process.env.OPENAI_API_KEY = 'openai-key';
    process.env.OPENAI_MODEL = 'gpt-test';
    process.env.OPENAI_MAX_OUTPUT_TOKENS = '1500';

    fetchMock = jest.fn() as jest.MockedFunction<typeof fetch>;
    global.fetch = fetchMock;

    const module: TestingModule = await Test.createTestingModule({
      providers: [AiService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<AiService>(AiService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_MODEL;
    delete process.env.OPENAI_MAX_OUTPUT_TOKENS;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should ask OpenAI with product context and return output_text answer', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    fetchMock.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({ output_text: 'This pouf fits accent decor.' }),
    } as Response);

    const result = await service.askProductAssistant(
      'product-1',
      'Will it fit my hallway?',
    );

    expect(prisma.product.findUnique).toHaveBeenCalledWith({
      where: { id: 'product-1' },
      include: {
        category: { select: { name: true } },
        designer: { select: { name: true } },
        reviews: { select: { rating: true } },
      },
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.openai.com/v1/responses',
      expect.objectContaining({
        method: 'POST',
        headers: {
          Authorization: 'Bearer openai-key',
          'Content-Type': 'application/json',
        },
      }),
    );

    const [, requestInit] = fetchMock.mock.calls[0];
    const requestBody = requestInit?.body;

    if (typeof requestBody !== 'string') {
      throw new Error('Expected OpenAI request body to be a string');
    }

    const body = JSON.parse(requestBody) as {
      model: string;
      input: string;
      max_output_tokens: number;
    };

    expect(body.model).toBe('gpt-test');
    expect(body.input).toContain('Title: Pouf Drova 4');
    expect(body.input).toContain('Average rating: 4.5');
    expect(body.max_output_tokens).toBe(1200);
    expect(result).toEqual({ answer: 'This pouf fits accent decor.' });
  });

  it('should return answer from nested output content', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    fetchMock.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          output: [
            {
              content: [
                { type: 'output_text', text: 'Nested assistant answer.' },
              ],
            },
          ],
        }),
    } as Response);

    await expect(
      service.askProductAssistant('product-1', 'Question'),
    ).resolves.toEqual({ answer: 'Nested assistant answer.' });
  });

  it('should reject when OpenAI API key is not configured', async () => {
    delete process.env.OPENAI_API_KEY;

    await expect(
      service.askProductAssistant('product-1', 'Question'),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
    expect(prisma.product.findUnique).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should reject when product is not found', async () => {
    prisma.product.findUnique.mockResolvedValue(null);

    await expect(
      service.askProductAssistant('missing-product', 'Question'),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('should reject with OpenAI error message when request fails', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    fetchMock.mockResolvedValue({
      ok: false,
      status: 429,
      text: () =>
        Promise.resolve(
          JSON.stringify({ error: { message: 'Quota exceeded' } }),
        ),
    } as Response);

    await expect(
      service.askProductAssistant('product-1', 'Question'),
    ).rejects.toThrow('Quota exceeded');
  });

  it('should reject when assistant response is empty', async () => {
    prisma.product.findUnique.mockResolvedValue(product);
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    } as Response);

    await expect(
      service.askProductAssistant('product-1', 'Question'),
    ).rejects.toBeInstanceOf(BadGatewayException);
  });
});
