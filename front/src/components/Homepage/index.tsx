import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import AuthContext from "../../utils/authContext";
import AuthLoadingScreen from "../Auth/AuthLoadingScreen";
import AdminHomepage from "./AdminHomepage";

export { AdminHomepage };

const DashboardBody = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  if (!auth) {
    return <AuthLoadingScreen />;
  }

  if (auth.role === "ADMIN") return <AdminHomepage />;
  else {
    router.push("/");
  }
};

export default DashboardBody;
