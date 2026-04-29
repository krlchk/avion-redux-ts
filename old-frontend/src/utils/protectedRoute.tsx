import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { JSX } from "react";

interface IProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const user = useAppSelector((state) => state.root.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
