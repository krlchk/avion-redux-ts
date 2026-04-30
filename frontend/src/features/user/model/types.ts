export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isTwoFactorEnabled?: boolean;
}
type Role = "CUSTOMER" | "ADMIN" | "DESIGNER";
