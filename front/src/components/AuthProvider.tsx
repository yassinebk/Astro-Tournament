import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import {
  useMeQuery,
  UserNoPassword
} from "../generated/graphql";
import AuthContext from "../utils/authContext";

export function AuthProvider({ children }) {
  const { data, loading } = useMeQuery({ pollInterval: 1000 });
  const [auth, setAuth] = useState<null | UserNoPassword>(null);
  const router = useRouter();

  // const findIfUserConnected = async () => {
  //   const result = await getUser();
  //   return result;
  // };
  useEffect(() => {
    // findIfUserConnected().catch(console.error);
    if (!loading && data) {
      if (data.me?.user) {
        setAuth(data.me.user as UserNoPassword);

        if (router.asPath === "/" || router.asPath === "/signin")
          router.push(`/${data.me.user._id}`);
      }
      // } else {
      //   setAuth(null);
      // }
    } else if (!data && loading) {
      setAuth(null);
    }
  }, [data, loading, router.asPath]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
