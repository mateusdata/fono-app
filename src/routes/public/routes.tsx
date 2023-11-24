import React, { useContext } from "react";
import PublicRoutes from "./publicRoutes";
import { Context } from "../../context/AuthProvider";
import PrivateRoutes from "../private/privateRoutes";


const Routes = () => {
  const { user } = useContext(Context);
  return !user ? <PublicRoutes /> : <PrivateRoutes /> ;
};

export default Routes;