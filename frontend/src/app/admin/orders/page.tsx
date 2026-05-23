import { AdminOrdersPage, AdminShell } from "@/widgets/admin";

const AdminOrders = () => {
  return (
    <AdminShell activeSection="orders">
      <AdminOrdersPage />
    </AdminShell>
  );
};

export default AdminOrders;
