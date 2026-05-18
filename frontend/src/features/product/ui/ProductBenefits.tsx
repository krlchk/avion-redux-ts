import { Container } from "@/shared/ui";
import { benefits } from "../model/product.mocks";

export const ProductBenefits = () => {
  return (
    <div className="bg-[#eeedec]">
      <Container className="mobile:grid-cols-1 mobile:gap-10 grid grid-cols-3 gap-20 py-10">
        {benefits.map(({ title, desc, Icon }) => (
          <div
            key={title}
            className="mobile:justify-start flex min-w-0 items-center justify-center gap-6 text-black"
          >
            <Icon className="shrink-0" />
            <div className="min-w-0">
              <p className="mobile:text-xl mobile:leading-6 text-2xl leading-7 font-bold">
                {title}
              </p>
              <p className="mobile:text-sm text-base font-normal text-black/60">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
};
