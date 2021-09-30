import React, { useContext } from "react";
import AuthContext from "../../utils/authContext";
import { AuthLoadingScreen, AuthLayout } from "../../components/Auth";
import {
  AdminWelcomeScreenContent,
  PlayerWelcomeScreenContent,
} from "../../components/WelcomeScreen";

interface indexProps {}

export const WelcomeScreen: React.FC<indexProps> = ({}) => {
  const auth = useContext(AuthContext);
  if (!auth) {
    return <AuthLoadingScreen />;
  }
  return (
    <AuthLayout>
      {auth.role === "ADMIN" ? (
        <AdminWelcomeScreenContent />
      ) : (
        <PlayerWelcomeScreenContent />
      )}
    </AuthLayout>
  );
};

export default WelcomeScreen;
