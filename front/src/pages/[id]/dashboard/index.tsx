import React, { useContext } from "react";
import AuthLayout from "../../../components/Auth/AuthLayout";
import { AdminHomepage, PlayerHomepage } from "../../../components/Homepage";
import AuthContext from "../../../utils/authContext";

interface indexProps {}

export const index: React.FC<indexProps> = ({}) => {
  const auth = useContext(AuthContext);

  return (
    <AuthLayout>
      {auth === "ADMIN" ? <AdminHomepage /> : <PlayerHomepage />}
    </AuthLayout>
  );
};

export default index;
