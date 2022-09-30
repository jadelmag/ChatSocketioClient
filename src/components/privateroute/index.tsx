import { Outlet, Navigate } from "react-router-dom";
import { getUser, getToken } from "src/services/storage.serveice";
import { PrivateRouteInterface } from "src/components/privateroute/interface";

const PrivateRoute = ({ redirect }: PrivateRouteInterface): JSX.Element => {
  const user = getUser();
  const token = getToken();

  return !user && !token ? <Navigate to={redirect} /> : <Outlet />;
};

export default PrivateRoute;
