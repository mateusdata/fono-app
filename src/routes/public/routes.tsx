import React, { useContext } from "react";
import PublicRoutes from "./publicRoutes";
import PrivateRoutes from "../private/privateRoutes";
import { Context } from "../../context/ AuthProvider";


const Routes = () => {
  const { user } = useContext(Context);
  return !user ? <PublicRoutes /> : <PrivateRoutes /> ;
};

export default Routes;