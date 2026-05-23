import { AdminShell, AdminUsersPage } from "@/widgets/admin";

const AdminUsers = () => {
  return (
    <AdminShell activeSection="users" panel="admin">
      <AdminUsersPage />
    </AdminShell>
  );
};

export default AdminUsers;
