import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedVendor = () => {
  const vendor = useSelector((state) => state.vendor.vendor);

  if (!vendor) {
    return <Navigate to="/login-vendor" replace />;
  }

  return <Outlet />;
};

export default ProtectedVendor;
