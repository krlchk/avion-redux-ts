import { Container } from "@/shared/ui";
import { categories } from "../model/constants";

export const ProductCatalog = () => {
  return (
    <section className="bg-[#F9F9F9]">
      <Container className="flex items-center justify-center py-8">
        <div className="grid grid-cols-5 gap-24">
          {categories.map(({ title, count, Icon }) => (
            <div key={title} className="flex items-center justify-start gap-5">
              <Icon />
              <div className="font-bold text-black">
                <p className="text-xl">{title}</p>
                <p className="text-sm text-black/60">{count} products</p>
              </div>
            </div>
          ))}
        </div>
        c
      </Container>
    </section>
  );
};
