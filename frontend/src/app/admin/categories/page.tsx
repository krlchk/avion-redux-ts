import { AdminCategoriesPage, AdminShell } from "@/widgets/admin";

const AdminCategories = () => {
  return (
    <AdminShell activeSection="categories">
      <AdminCategoriesPage />
    </AdminShell>
  );
};

export default AdminCategories;
