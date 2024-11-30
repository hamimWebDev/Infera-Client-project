import { Navigate } from "react-router-dom";
import { TRole } from "./main";
import { useCurrentUser } from "./redux/features/auth/authSlice";
import { useAppSelector } from "./redux/features/hooks";

interface User {
  role: TRole;
}

export const ProtectedRoute = ({
  requiredRole,
  children,
}: {
  requiredRole: TRole;
  children: React.ReactNode;
}) => {
  const user = useAppSelector(useCurrentUser) as User | null;

  const role = user?.role;

  if (user === null) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === role) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
};
