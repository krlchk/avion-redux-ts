import { AdminProductsPage, AdminShell } from "@/widgets/admin";

const AdminProducts = () => {
  return (
    <AdminShell activeSection="products">
      <AdminProductsPage />
    </AdminShell>
  );
};

export default AdminProducts;
