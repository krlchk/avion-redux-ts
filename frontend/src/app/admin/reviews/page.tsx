import { AdminReviewsPage, AdminShell } from "@/widgets/admin";

const AdminReviews = () => {
  return (
    <AdminShell activeSection="reviews" panel="admin">
      <AdminReviewsPage />
    </AdminShell>
  );
};

export default AdminReviews;
