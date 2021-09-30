import React, { useContext } from "react";
import { AuthLayout,AuthLoadingScreen } from "../../../components/Auth";
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
