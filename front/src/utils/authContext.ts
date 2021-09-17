import { stringify } from "querystring";
import { createContext, useState } from "react";
import { Questions, useMeQuery, UserNoPassword } from "../generated/graphql";

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

const AuthContext = createContext<any>(null);

export default AuthContext;
