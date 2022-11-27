import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

export const RolesEnums = new Map([
  ["CUSTOMER_NOT_LOGIN", "customer_not_login"],
  ["CUSTOMER_LOGIN", "customer_login"],
  ["ADMIN", "admin"],
]);

function ProtectedRoute({ roles, component: Component, ...rest }) {
  console.log(
    "🚀 ~ file: ProtectedRoute.js ~ line 12 ~ ProtectedRoute ~ roles",
    roles
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  const authorities = useMemo(() => {
    if (!userInfo) {
      return [RolesEnums.get("CUSTOMER_NOT_LOGIN")];
    }
    if (userInfo.token && userInfo.isAdmin) {
      return [RolesEnums.get("ADMIN")];
    }
    if (userInfo.token && !userInfo.isAdmin) {
      return [RolesEnums.get("CUSTOMER_LOGIN")];
    }
    return [RolesEnums.get("CUSTOMER_NOT_LOGIN")];
  }, [userInfo]);

  const hasPermission = (roles) => {
    let exits = false;

    roles.forEach((role) => {
      if (authorities.includes(role)) {
        exits = true;
      }
    });

    return exits;
  };

  if (roles.length == 0 || hasPermission(roles)) {
    return <Route {...rest} render={() => <Component />} />;
  } else {
    return <Route {...rest} render={() => <Redirect to={"/404"} />} />;
  }
}

export default ProtectedRoute;
