import { VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import AuthLayout from "../../../components/Auth/AuthLayout";
import AuthLoadingScreen from "../../../components/Auth/AuthLoadingScreen";
import SwitchUsersTypeButton from "../../../components/UserList/SwitchUsersTypeButton";
import UserCard from "../../../components/UserList/UserCard";
import {
  useAllUsersQuery,
  UserBasicInfo,
  useSetRoleMutation,
} from "../../../generated/graphql";
import withApollo from "../../../utils/createApolloClient";
import { handleGraphlQLErrors } from "../../../utils/handleGraphlQLErrors";

interface usersListProps {}

export const UsersList: React.FC<usersListProps> = () => {
  const { data, loading } = useAllUsersQuery();
  const [currentType, setCurrentType] = useState("player");
  const changeUserType = () => {
    if (currentType === "player") setCurrentType("admin");
    else if (currentType === "admin") setCurrentType("player");
    else {
      console.error("unknown type");
    }
  };
  // eslint-disable-next-line no-unused-vars
  const [setUserRole, { error }] = useSetRoleMutation({
    notifyOnNetworkStatusChange: true,
    refetchQueries: ["allUsers"],
    onError: handleGraphlQLErrors,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  if (loading) {
    return <AuthLoadingScreen />;
  }
  if (!data) {
    return null;
  }
  return (
    <AuthLayout>
      <VStack spacing={4} paddingTop="8%" position="relative">
        {data.allUsers
          .filter((u) => u.role === currentType.toUpperCase())
          .map((u) => (
            <UserCard
              key={u._id}
              user={u as UserBasicInfo}
              currentType={currentType}
              setUserRole={setUserRole}
            />
          ))}

        <SwitchUsersTypeButton
          onClick={changeUserType}
          currentType={currentType}
        />
      </VStack>
    </AuthLayout>
  );
};

export default withApollo({ ssr: true })(UsersList);
