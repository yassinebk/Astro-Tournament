import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useMeQuery, UserNoPassword } from "../generated/graphql";
import AuthContext from "../utils/authContext";

export function AuthProvider({ children }) {
  const { data, loading } = useMeQuery();
  const [auth, setAuth] = useState<null | UserNoPassword>(null);
  const router = useRouter();

  useEffect(() => {
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
      console.log("here", loading);
      setAuth(null);
    }
  }, [data, loading, router.asPath]);

  return (
    <AuthContext.Provider value={data?.me?.user}>
      {children}
    </AuthContext.Provider>
  );
}
