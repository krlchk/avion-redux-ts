export const CartTableHeader = () => {
  return (
    <div className="grid grid-cols-[1.7fr_0.7fr_0.7fr] gap-6 py-6 text-sm font-medium tracking-[0.18em] text-black/40 uppercase">
      <p>Product</p>
      <p className="text-center">Quantity</p>
      <p className="text-right">Subtotal</p>
    </div>
  );
};
