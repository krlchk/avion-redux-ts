import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

interface OpenAIResponseContent {
  type?: string;
  text?: string;
}

interface OpenAIResponseOutput {
  content?: OpenAIResponseContent[];
}

interface OpenAIResponse {
  output_text?: string;
  output?: OpenAIResponseOutput[];
}

interface OpenAIErrorResponse {
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
}

const clampText = (value: string | null | undefined, maxLength: number) => {
  if (!value) return '';

  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
};

const getMaxOutputTokens = () => {
  const envValue = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS);

  if (!Number.isFinite(envValue) || envValue <= 0) {
    return 700;
  }

  return Math.min(envValue, 1200);
};

@Injectable()
export class AiService {
  constructor(private readonly prisma: PrismaService) {}

  async askProductAssistant(productId: string, question: string) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new ServiceUnavailableException('OpenAI API key is not configured');
    }

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        designer: {
          select: {
            name: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id:${productId} not found`);
    }

    const averageRating =
      product.reviews.length === 0
        ? 0
        : product.reviews.reduce(
            (result, review) => result + review.rating,
            0,
          ) / product.reviews.length;

    const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
    const safeQuestion = clampText(question.trim(), 800);
    const safeDescription = clampText(product.description, 1200);
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        instructions:
          'You are Avion product assistant. Give a thoughtful, useful answer for a furniture ecommerce customer. Use only the provided product context. Be specific about fit, style, dimensions, use cases, tradeoffs, and what the customer should double-check before buying. Structure the answer with short plain-text sections when helpful. Do not use Markdown syntax: no ### headings, no **bold**, no bullet markup that requires Markdown rendering. Use simple headings and plain hyphen lines only. If information is missing, say what is missing and suggest contacting an operator. Do not invent delivery, warranty, materials, or store policies.',
        input: `Product context:
Title: ${product.title}
Description: ${safeDescription || 'No description'}
Category: ${product.category?.name || 'Unknown'}
Designer: ${product.designer?.name || 'Unknown'}
Price: ${String(product.price)}
Stock: ${product.stock}
Dimensions: width ${product.width}cm, height ${product.height}cm, depth ${product.depth}cm
Discount percent: ${product.discountPercent ?? 0}
Reviews count: ${product.reviews.length}
Average rating: ${Number(averageRating.toFixed(1))}

Customer question: ${safeQuestion}`,
        max_output_tokens: getMaxOutputTokens(),
      }),
    });

    if (!response.ok) {
      let errorMessage = `OpenAI request failed with status ${response.status}`;
      const errorText = await response.text();

      if (errorText) {
        try {
          const errorBody = JSON.parse(errorText) as OpenAIErrorResponse;
          errorMessage = errorBody.error?.message || errorText;
        } catch {
          errorMessage = errorText;
        }
      }

      throw new BadGatewayException(errorMessage);
    }

    const data = (await response.json()) as OpenAIResponse;
    const answer =
      data.output_text ||
      data.output
        ?.flatMap((output) => output.content ?? [])
        .find((content) => content.type === 'output_text')?.text;

    if (!answer) {
      throw new BadGatewayException('AI assistant returned an empty response');
    }

    return {
      answer,
    };
  }
}
