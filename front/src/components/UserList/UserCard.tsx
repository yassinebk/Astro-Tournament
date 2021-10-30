import { Button } from "@chakra-ui/button";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import React from "react";
import { SetRoleMutationFn, UserBasicInfo } from "../../generated/graphql";
import ConfirmDialog from "../LevelEditor/ConfirmDialog";

interface UserCardProps {
  user: UserBasicInfo;
  currentType: string;
  setUserRole: SetRoleMutationFn;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  currentType,
  setUserRole,
}) => {
  console.log(user);
  const onClick = async () => {};
  const changeRole = async () => {
    await setUserRole({
      variables: {
        setRoleRole: user.role === "ADMIN" ? "PLAYER" : "ADMIN",
        setRoleUserId: user._id,
      },
    });
  };

  // eslint-disable-next-line no-unused-vars
  const { onOpen, onClose, isOpen } = useDisclosure();
  const isAdmin = currentType === "admin";
  return (
    <HStack
      border="1px solid #879091"
      alignItems="center"
      justifyContent="space-around"
      minH="70px"
      minW="360px"
      color={isAdmin ? "#43EEFF" : "white"}
      padding="16px, 26px, 16px, 20px"
      borderRadius="8.53211px"
      bgColor={isAdmin ? "#2D5254" : "#000000EB"}
    >
      <ConfirmDialog
        onClose={onClose}
        isOpen={isOpen}
        callback={changeRole}
        text={"Are you sure you want to change user role ? "}
      />
      <FaUserAstronaut fontSize="21px" />
      <Box maxW="32%" textAlign="center">
        <Text fontSize="md">{user.username}</Text>
        <Text fontSize="8px" isTruncated>
          {user._id}
        </Text>
      </Box>
      {!isAdmin && (
        <Button
          bgColor="#7FD8D8"
          padding="16px"
          borderRadius="15px"
          boxShadow="4px 4px 8px rgba(81, 78, 128, 0.67)"
          backdropFilter="blur(20px)"
          onClick={onClick}
          minH="37px"
          minW="100px"
          color="#405555"
        >
          Make Admin
        </Button>
      )}
    </HStack>
  );
};

export default UserCard;
