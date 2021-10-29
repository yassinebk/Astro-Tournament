import { stringify } from "querystring";
import { createContext, useState } from "react";
import { Questions, useMeQuery, UserNoPassword } from "../generated/graphql";

export const useAuth = () => {
  const { data, loading, error } = useMeQuery();

  return {
    data,
    loading,
    error,
  };
};

const AuthContext = createContext<any>(null);

export default AuthContext;
