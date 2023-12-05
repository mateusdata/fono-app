import React, { useContext } from "react";
import { Context } from "../context/AuthProvider";
import PublicRoutes from "./public/publicRoutes";
import PrivateRoutes from "./private/privateRoutes";


const Routes = () => {
  const { user } = useContext(Context);
  return !user ? <PublicRoutes /> : <PrivateRoutes /> ;
};

export default Routes;