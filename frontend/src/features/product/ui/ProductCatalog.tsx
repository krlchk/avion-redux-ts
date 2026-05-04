import { ProductCategories } from "./ProductCategories";
import { ProductBenefits } from "./ProductBenefits";
import { ProductMainCatalog } from "./ProductMainCatalog";

export const ProductCatalog = () => {
  return (
    <section className="bg-[#F9F9F9]">
      <ProductCategories />
      <ProductMainCatalog />
      <ProductBenefits />
    </section>
  );
};
