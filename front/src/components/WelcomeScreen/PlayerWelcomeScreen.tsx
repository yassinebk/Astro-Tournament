import { useRouter } from "next/dist/client/router";
import React from "react";
import { UserNoPassword } from "../../generated/graphql";
import MobileView from "./PlayerHomepageMobile";
import WebView from "./PlayerHomepageWeb";

interface PlayerWelcomeScreenProps {
  user: UserNoPassword;
}

const PlayerWelcomeScreen: React.FC<PlayerWelcomeScreenProps> = ({ user }) => {
  const router = useRouter();
  if (!user) router.push("/");
 
  return (
    <>
      <WebView user={user} />
      <MobileView />
    </>
  );
};

export default PlayerWelcomeScreen;
