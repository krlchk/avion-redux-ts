import { AdminShell, AdminUsersPage } from "@/widgets/admin";

const AdminUsers = () => {
  return (
    <AdminShell activeSection="users">
      <AdminUsersPage />
    </AdminShell>
  );
};

export default AdminUsers;
