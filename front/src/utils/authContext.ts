import { createContext } from "react";
import { useMeQuery } from "../generated/graphql";

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
