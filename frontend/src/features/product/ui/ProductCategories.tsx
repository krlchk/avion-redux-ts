import { Container } from "@/shared/ui";
import { categories } from "../model/constants";

export const ProductCategories = () => {
  return (
    <Container className="flex items-center justify-center py-8">
      <div className="mobile:grid-cols-2 mobile:gap-8 xs:grid-cols-1 grid w-full grid-cols-5 tablet:grid-cols-4 gap-10">
        {categories.map(({ title, count, Icon }) => (
          <div
            key={title}
            className="mobile:justify-start flex min-w-0 items-center justify-center tablet:justify-start gap-5"
          >
            <Icon className="shrink-0" />
            <div className="font-bold text-black">
              <p className="mobile:text-lg xs:text-base text-xl">{title}</p>
              <p className="xs:text-xs text-sm text-black/60">
                {count} products
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};
