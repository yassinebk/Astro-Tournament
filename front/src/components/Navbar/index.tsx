import { Router, useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useMeQuery } from "../../generated/graphql";
import { AuthNavbar } from "./AuthNavbar";
import { NoAuthNavbar } from "./NoAuthNavbar";

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = () => {
  const { data, loading } = useMeQuery();
  const [auth, setAuth] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && data) {
      if (data.me?.user) {
        router.push(`/user/${data.me.user._id}`);
      } else {
        setAuth(null);
      }
      console.log(data);
    }
  }, [data, loading]);
  if (auth) {
    return <AuthNavbar role={auth.role} />;
  }

  return <NoAuthNavbar />;
};

export default Navbar;
