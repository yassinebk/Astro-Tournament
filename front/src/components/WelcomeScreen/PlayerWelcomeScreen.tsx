import { useRouter } from "next/dist/client/router";
import React from "react";
import { UserNoPassword } from "../../generated/graphql";
import PlayerMobileView from "./PlayerMobileView";
import PlayerWebView from "./PlayerWebView";

interface PlayerWelcomeScreenProps {
  user: UserNoPassword;
}

const PlayerWelcomeScreen: React.FC<PlayerWelcomeScreenProps> = ({ user }) => {
  const router = useRouter();
  if (!user) router.push("/");
  const WebView = () => {
    return <PlayerWebView user={user} />;
  };
  return (
    <>
      <WebView />
      <PlayerMobileView />
    </>
  );
};

export default PlayerWelcomeScreen;
