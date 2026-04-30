import { Container } from "@/shared/ui";
import { ProductCategories } from "./ProductCategories";
import { benefits } from "../model/constants";

export const ProductCatalog = () => {
  return (
    <section className="bg-[#F9F9F9]">
      <ProductCategories />
      <div className="bg-[#F9F9F9]">
        <Container className="grid grid-cols-3 gap-20 py-10 mobile:grid-cols-1 mobile:gap-10">
          {benefits.map(({ title, desc, Icon }) => (
            <div
              key={title}
              className="flex min-w-0 items-center justify-center gap-6 text-black mobile:justify-start"
            >
              <Icon className="shrink-0" />
              <div className="min-w-0">
                <p className="text-2xl leading-7 font-bold mobile:text-xl mobile:leading-6">
                  {title}
                </p>
                <p className="text-base font-normal text-black/60 mobile:text-sm">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
};
