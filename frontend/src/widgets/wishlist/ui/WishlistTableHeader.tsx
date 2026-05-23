export const WishlistTableHeader = () => {
  return (
    <div className="mobile:hidden grid grid-cols-[1.7fr_0.8fr_0.8fr_0.9fr] gap-6 py-6 text-sm font-medium tracking-[0.18em] text-black/40 uppercase">
      <p>Product</p>
      <p>Price</p>
      <p>Stock status</p>
      <p className="text-right">Action</p>
    </div>
  );
};
