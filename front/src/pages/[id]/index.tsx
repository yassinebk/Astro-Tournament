import React, { useContext, useEffect } from "react";
import { AuthLayout, AuthLoadingScreen } from "../../components/Auth";
import {
  AdminWelcomeScreen,
  PlayerWelcomeScreen,
} from "../../components/WelcomeScreen";
import AuthContext from "../../utils/authContext";
import withApollo from "../../utils/createApolloClient";

interface WelcomeProps {}

const WelcomeScreen: React.FC<WelcomeProps> = () => {
  // const client = useApolloClient();

  // const router = useRouter();

  const userValue = useContext(AuthContext);

  useEffect(() => {
    console.log("userValue", userValue);
  }, [userValue]);

  console.log(userValue);
  if (!userValue) {
    return <AuthLoadingScreen />;
  }

  return (
    <AuthLayout>
      {userValue.role === "ADMIN" ? (
        <AdminWelcomeScreen user={userValue} />
      ) : (
        <PlayerWelcomeScreen user={userValue} />
      )}
    </AuthLayout>
  );
};

export default withApollo({ ssr: false })(WelcomeScreen);
