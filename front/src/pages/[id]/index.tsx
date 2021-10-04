import { gql, useApolloClient } from "@apollo/client";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { AuthLayout, AuthLoadingScreen } from "../../components/Auth";

import {
  AdminWelcomeScreen,
  PlayerWelcomeScreen,
} from "../../components/WelcomeScreen";

import { useMeQuery } from "../../generated/graphql";
import withApollo from "../../utils/createApolloClient";

interface WelcomeProps {}

const WelcomeScreen: React.FC<WelcomeProps> = ({}) => {
  const client = useApolloClient();

  const router = useRouter();
  const [user, setUser] = useState(null);
  const { data: meData, loading: meLoading, error: meError } = useMeQuery();

  useEffect(() => {
    const query = client.readQuery({
      query: gql`
        query Me {
          me {
            user {
              email
              role
            }
          }
        }
      `,
    });
    if (meData && !meLoading) {
      console.log(user);
      setUser(meData.me.user);
    }
  });

  if (!user) {
    return <AuthLoadingScreen />;
  }
  return (
    <AuthLayout>
      {user.role === "PLAYER" ? (
        <AdminWelcomeScreen user={meData.me.user} />
      ) : (
        <PlayerWelcomeScreen />
      )}
    </AuthLayout>
  );
};

export default withApollo({ ssr: false })(WelcomeScreen);
