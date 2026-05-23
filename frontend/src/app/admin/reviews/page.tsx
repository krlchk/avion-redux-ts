import { AdminReviewsPage, AdminShell } from "@/widgets/admin";

const AdminReviews = () => {
  return (
    <AdminShell activeSection="reviews">
      <AdminReviewsPage />
    </AdminShell>
  );
};

export default AdminReviews;
