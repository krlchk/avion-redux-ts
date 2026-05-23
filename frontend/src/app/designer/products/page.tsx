import { AdminProductsPage, AdminShell } from "@/widgets/admin";

const DesignerProducts = () => {
  return (
    <AdminShell activeSection="products" panel="designer">
      <AdminProductsPage />
    </AdminShell>
  );
};

export default DesignerProducts;
