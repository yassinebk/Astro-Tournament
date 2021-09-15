import React from "react";
import AuthLayout from "../../../../components/Auth/AuthLayout";
import withApollo from "../../../../utils/createApolloClient";

interface AuthenticaedHomePageProps {}

export const AuthenticatedHomePage: React.FC<AuthenticaedHomePageProps> =
  ({}) => {
    return <AuthLayout />;
  };

export default withApollo({ ssr: false })(AuthenticatedHomePage);
