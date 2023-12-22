import { Spinner } from "@material-tailwind/react";
import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Spinner className="h-12 w-12" />
      </div>
    );

  if (user?.email) {
    return children;
  }

  return <Navigate to="/logIn" replace></Navigate>;
};

export default PrivateRoute;
