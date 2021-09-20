import React, { useContext } from "react";
import AuthLayout from "../../../components/Auth/AuthLayout";
import AuthLoadingScreen from "../../../components/AuthLoadingScreen";
import { AdminHomepage, PlayerHomepage } from "../../../components/Homepage";
import AuthContext from "../../../utils/authContext";

interface indexProps {}

export const index: React.FC<indexProps> = ({}) => {
  const auth = useContext(AuthContext);
  if (!auth) {
    return <AuthLoadingScreen />;
  }
  return (
    <AuthLayout>
      {auth.role === "ADMIN" ? <AdminHomepage /> : <PlayerHomepage />}
    </AuthLayout>
  );
};

export default index;
