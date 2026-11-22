import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FullScreenLoader } from "../common/FullScreenLoader";

export function PublicOnlyRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <FullScreenLoader />;
  if (user) return <Navigate to="/" replace />;

  return <Outlet />;
}
