import React from "react";
import AuthLayout from "../../../components/Auth/AuthLayout";
import { AuthProvider } from "../../../components/AuthProvider";
import DashboardBody from "../../../components/Homepage";
import withApollo from "../../../utils/createApolloClient";

interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  return (
    <AuthProvider>
      <AuthLayout>
        <DashboardBody />
      </AuthLayout>
    </AuthProvider>
  );
};

export default withApollo({ ssr: true })(index);
