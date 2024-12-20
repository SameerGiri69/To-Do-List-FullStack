import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../Context/useAuth";
import PropTypes from "prop-types";

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  return isLoggedIn() ? (
    <>{children}</>
  ) : (
    <Navigate to={"/"} state={{ from: location }} replace />
  );
};
ProtectedRoutes.propTypes = {
  children: PropTypes.node.isRequired, // Validates that children are React nodes
};
export default ProtectedRoutes;
