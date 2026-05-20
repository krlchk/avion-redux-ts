import { ProductCatalog } from "@/features/product/ui";

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string | string[];
    categoryId?: string | string[];
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const search = Array.isArray(params.search)
    ? params.search[0]
    : (params.search ?? "");

  const categoryId = Array.isArray(params.categoryId)
    ? params.categoryId[0]
    : (params.categoryId ?? "");
  return (
    <ProductCatalog
      key={`${search}-${categoryId}`}
      initialSearchTerm={search}
      initialCategoryId={categoryId}
    />
  );
}
