import { Navigate, Outlet } from "react-router-dom";
import { SiteLinks } from "../../enum/SiteLinks";
import { useAuthStore } from "../../state/AuthStore";

interface PrivateRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

export const PrivateRoute = ({
  redirectPath = SiteLinks.Login,
  children,
}: PrivateRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.user);
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children as React.ReactElement : <Outlet />;
};