"use client";

import { useGetProductsQuery } from "@/store/services/productsApi";

export const ProductTest = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery({});

  if (isLoading) return <div>Loading products...</div>;

  if (isError) {
    console.log(error);
    return <div>Error loading products</div>;
  }

  return (
    <div>
      {data?.data.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};
