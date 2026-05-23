import { AdminOrdersPage, AdminShell } from "@/widgets/admin";

const AdminOrders = () => {
  return (
    <AdminShell activeSection="orders" panel="admin">
      <AdminOrdersPage />
    </AdminShell>
  );
};

export default AdminOrders;
