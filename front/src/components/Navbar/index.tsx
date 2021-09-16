import React, { useContext } from "react";
import { Role } from "../../generated/graphql";
import AuthContext from "../../utils/authContext";
import { AuthNavbar } from "./AuthNavbar";
import { NoAuthNavbar } from "./NoAuthNavbar";

interface NavbarProps {}
export const Navbar: React.FC<NavbarProps> = ({}) => {
  const auth = useContext(AuthContext);
  if (auth) {
    return <AuthNavbar role={auth} />;
  }

  return <NoAuthNavbar />;
};

export default Navbar;
