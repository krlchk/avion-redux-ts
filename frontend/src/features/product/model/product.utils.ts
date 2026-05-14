import { defaultPriceRange, PRODUCTS_PER_PAGE } from "./catalog.constants";
import { BuildProductQueryParams, MapProductToCardItemParams, Product, ProductQuery } from "./types";

export const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;

export const buildProductQuery = ({
  selectedSortConfig,
  catalogPage,
  selectedCategories,
  selectedDesigners,
  priceRange,
}: BuildProductQueryParams) => {
  const query: ProductQuery = {};

  query.sortBy = selectedSortConfig.sortBy;
  query.sortOrder = selectedSortConfig.sortOrder;
  query.page = catalogPage;
  query.limit = PRODUCTS_PER_PAGE;
  if (selectedCategories.length > 0) query.categoryIds = selectedCategories;
  if (selectedDesigners.length > 0) query.designerIds = selectedDesigners;
  if (defaultPriceRange[0] !== priceRange[0]) query.minPrice = priceRange[0];
  if (defaultPriceRange[1] !== priceRange[1]) query.maxPrice = priceRange[1];

  return query;
};

export const isProductNew = (createdAt: string, now: Date) => {
  const createdTime = new Date(createdAt).getTime();
  return now.getTime() - createdTime <= THREE_DAYS_MS;
};

export const isProductSale = (product: Product, now: Date) => {
  if (!product.discountPercent || product.discountPercent <= 0) {
    return false;
  }

  if (!product.discountUntil) {
    return true;
  }

  return new Date(product.discountUntil).getTime() > now.getTime();
};

export const getProductBadge = (
  product: Product,
  now: Date,
): "new" | "sale" | undefined => {
  const isSale = isProductSale(product, now);
  if (isSale) {
    return "sale";
  }
  if (isProductNew(product.createdAt, now)) {
    return "new";
  }
  return undefined;
};

export const mapProductToCardItem = ({
  product,
  now,
}: MapProductToCardItemParams) => {
  const isDiscount = isProductSale(product, now);

  return {
    id: product.id,
    title: product.title,
    image: product.img,
    price: String(product.finalPrice),
    oldPrice: String(product.price),
    badge: getProductBadge(product, now),
    isDiscount,
  };
};
