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

export type Role = "CUSTOMER" | "ADMIN" | "DESIGNER";

export interface UserResponse {
  data: User[];
}
export interface DesignerResponse {
  data: Designer[];
}

export interface ProfileResponse {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isTwoFactorEnabled: boolean;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserRequest {
  id: string;
  name: string;
}
