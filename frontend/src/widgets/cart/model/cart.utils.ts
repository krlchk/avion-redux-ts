export const formatCartPrice = (price: number) => {
  return `$${price.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
};
