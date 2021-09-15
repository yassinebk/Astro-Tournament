import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useMeQuery, UserNoPassword } from "../../generated/graphql";
import { AuthNavbar } from "./AuthNavbar";
import { NoAuthNavbar } from "./NoAuthNavbar";

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = () => {
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
      }
      console.log(data);
    } else {
      setAuth(null);
      router.push("/");
    }
  }, [data, loading]);
  if (auth) {
    return <AuthNavbar role={auth.role} />;
  }

  return <NoAuthNavbar />;
};

export default Navbar;
