import { create } from "domain";
import { stringify } from "querystring";
import { createContext, useState } from "react";
import { useMeLazyQuery, useMeQuery } from "../generated/graphql";

export const useAuth = () => {
  const [value, setValue] = useState(null);
  const signIn = (user, token) => {
    setValue({
      user,
      token,
    });

    localStorage.setItem("authUser", stringify(value));
  };

  const signOut = () => {
    localStorage.removeItem("authUser");
    setValue(null);
  };

  const { data, loading, error } = useMeQuery();

  return {
    signIn,
    signOut,
    data,
    loading,
    error,
    value,
  };
};

const AuthContext = createContext(null);

export default AuthContext;
