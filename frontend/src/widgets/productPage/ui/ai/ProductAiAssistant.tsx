"use client";

import { ComponentProps, useState } from "react";
import { Loader } from "@/shared/ui";
import { useAskProductAssistantMutation } from "@/store/services/aiApi";
import { getProfileActionErrorMessage } from "@/widgets/profile/model/profile.utils";

interface ProductAiAssistantProps {
  productId: string;
  productTitle: string;
}

type FormSubmitHandler = NonNullable<ComponentProps<"form">["onSubmit"]>;

const QUESTION_MAX_LENGTH = 800;

const formatAiAnswer = (value: string) => {
  return value
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/^\s*[-*]\s+\*\*(.*?)\*\*:?\s*/gm, "- $1: ")
    .trim();
};

const getAiAssistantErrorMessage = (error: unknown) => {
  const message = getProfileActionErrorMessage(error);
  const normalizedMessage = message.toLowerCase();

  if (
    normalizedMessage.includes("quota") ||
    normalizedMessage.includes("billing")
  ) {
    return "AI assistant is temporarily unavailable. Our operator can help you with this product.";
  }

  return message;
};

export const ProductAiAssistant = ({
  productId,
  productTitle,
}: ProductAiAssistantProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [askProductAssistant, { isLoading }] =
    useAskProductAssistantMutation();

  const handleSubmit: FormSubmitHandler = async (event) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      setMessage("Ask a question about this product.");
      return;
    }

    setAnswer("");
    setMessage("");

    try {
      const response = await askProductAssistant({
        productId,
        question: trimmedQuestion,
      }).unwrap();

      setAnswer(formatAiAnswer(response.answer));
    } catch (error) {
      setMessage(getAiAssistantErrorMessage(error));
    }
  };

  return (
    <section className="mt-20 border border-[#947458]/20 bg-[#f5f5f5] p-8 text-black">
      <p className="text-sm font-bold tracking-[0.18em] text-[#947458] uppercase">
        AI assistant
      </p>
      <h2 className="mt-4 text-3xl font-bold">Ask about {productTitle}</h2>
      <p className="mt-4 max-w-3xl text-base leading-7 font-medium text-black/50">
        Get a detailed fit, style, dimension, and use-case suggestion based on
        this product.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={QUESTION_MAX_LENGTH}
          placeholder="Will this fit a small dining room with oak floors and a neutral sofa?"
          className="min-h-28 border border-black/15 bg-white px-4 py-3 text-base font-medium outline-none transition-colors focus:border-[#947458]"
        />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-black/40">
            {question.length}/{QUESTION_MAX_LENGTH}
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="flex min-w-40 cursor-pointer items-center justify-center gap-3 bg-[#947458] px-7 py-3 text-sm font-bold tracking-[0.12em] text-white uppercase transition-all duration-300 hover:bg-[#a9825f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader styles="h-5 w-5 border-2 border-[#f5f5f5]/40 border-t-[#f5f5f5]" />
                Thinking
              </>
            ) : (
              "Ask AI"
            )}
          </button>
        </div>
      </form>

      {message && (
        <p className="mt-5 text-sm font-medium text-[#FB5454]">{message}</p>
      )}

      {answer && (
        <div className="mt-7 border border-[#947458]/20 bg-white p-6">
          <p className="text-sm font-bold tracking-[0.14em] text-[#947458] uppercase">
            Answer
          </p>
          <p className="mt-4 whitespace-pre-line text-base leading-7 font-medium text-black/65">
            {answer}
          </p>
        </div>
      )}
    </section>
  );
};
