export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isTwoFactorEnabled?: boolean;
}

export interface Designer {
  id: string;
  name: string;
  productsCount: number;
}

type Role = "CUSTOMER" | "ADMIN" | "DESIGNER";

export interface UserResponse {
  data: User[];
}
export interface DesignerResponse {
  data: Designer[];
}
