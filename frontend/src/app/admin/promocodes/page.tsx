import { AdminPromocodesPage, AdminShell } from "@/widgets/admin";

const AdminPromocodes = () => {
  return (
    <AdminShell activeSection="promocodes">
      <AdminPromocodesPage />
    </AdminShell>
  );
};

export default AdminPromocodes;
