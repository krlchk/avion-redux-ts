import { ProductDetails } from "@/widgets/productPage";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  return (
    <div className="bg-[#f5f5f5]">
      <ProductDetails productId={id} />
    </div>
  );
};

export default ProductPage;
