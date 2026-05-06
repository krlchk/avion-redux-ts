import { Container } from "./Container";

export const Loader = () => {
  return (
    <Container className="flex items-center justify-center py-8">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-[#947458]/20 border-t-[#947458]"
        aria-label="Loading categories"
        role="status"
      />
    </Container>
  );
};
