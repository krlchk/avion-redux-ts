import { AdminDashboard, AdminShell } from "@/widgets/admin";

const Designer = () => {
  return (
    <AdminShell activeSection="dashboard" panel="designer">
      <AdminDashboard panel="designer" />
    </AdminShell>
  );
};

export default Designer;
