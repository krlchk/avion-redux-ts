import { AdminCategoriesPage, AdminShell } from "@/widgets/admin";

const AdminCategories = () => {
  return (
    <AdminShell activeSection="categories" panel="admin">
      <AdminCategoriesPage />
    </AdminShell>
  );
};

export default AdminCategories;
