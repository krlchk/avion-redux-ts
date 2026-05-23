import { AdminPromocodesPage, AdminShell } from "@/widgets/admin";

const AdminPromocodes = () => {
  return (
    <AdminShell activeSection="promocodes" panel="admin">
      <AdminPromocodesPage />
    </AdminShell>
  );
};

export default AdminPromocodes;
