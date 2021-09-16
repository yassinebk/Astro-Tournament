import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useMeQuery, UserNoPassword } from "../generated/graphql";
import AuthContext from "../utils/authContext";
import withApollo from "../utils/createApolloClient";

export function AuthProvider({ children }) {
  const { data, loading } = useMeQuery();
  const [auth, setAuth] = useState<null | UserNoPassword>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("here");
    if (!loading && data) {
      if (data.me?.user) {
        setAuth(data.me.user as UserNoPassword);
        router.push(
          `/user/${
            data.me.user._id
          }/dashboard/${data.me.user.role.toLowerCase()}`
        );

        console.log(data);
      }
      console.log(data);
    } else {
      setAuth(null);
      router.push("/");
    }
  }, [data, loading]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default withApollo({ ssr: true })(AuthProvider);
