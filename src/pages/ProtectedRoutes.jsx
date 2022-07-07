import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.login.isLogged);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoutes;
