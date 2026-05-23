import { AdminDashboard, AdminShell } from "@/widgets/admin";

const Admin = () => {
  return (
    <AdminShell activeSection="dashboard">
      <AdminDashboard />
    </AdminShell>
  );
};

export default Admin;
