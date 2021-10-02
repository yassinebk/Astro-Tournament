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
    if (!loading && data) {
      if (data.me?.user) {
        setAuth(data.me.user as UserNoPassword);

        if (router.asPath === "/" || router.asPath === "/signin")
          router.push(`/${data.me.user._id}/dashboard`);
        console.log(data);
      }
      // } else {
      //   setAuth(null);
      // }
    } else if (!data && loading) {
      setAuth(null);
      console.log("here");
      router.push("/");
    }
  }, [data, loading, router.asPath]);

  return (
    <AuthContext.Provider value={data?.me?.user}>
      {children}
    </AuthContext.Provider>
  );
}

export default withApollo({ ssr: false })(AuthProvider);
