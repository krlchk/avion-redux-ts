import { AdminDashboard, AdminShell } from "@/widgets/admin";

const Admin = () => {
  return (
    <AdminShell activeSection="dashboard" panel="admin">
      <AdminDashboard panel="admin" />
    </AdminShell>
  );
};

export default Admin;
