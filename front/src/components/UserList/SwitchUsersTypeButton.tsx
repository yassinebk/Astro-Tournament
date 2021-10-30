import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/react";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import React from "react";

interface SwitchUsersTypeButtonProps {
  onClick: () => void;
  currentType: string;
}

export const SwitchUsersTypeButton: React.FC<SwitchUsersTypeButtonProps> = ({
  onClick,
  currentType,
}) => {
  const isAdmin = currentType === "admin";
  return (
    <Button
      _focus={{}}
      _active={{}}
      variant="unstyled"
      onClick={onClick}
      bg={isAdmin ? "blackAlpha.900" : "coolGradient"}
      display="flex"
      flexDir="column"
      borderRadius="50%"
      w="85px"
      h="85px"
      position="fixed"
      bottom="6%"
      right="10%"
    >
      {" "}
      <FaUserAstronaut fontSize="30px" color="white" />
      <Text
        bgGradient={
          isAdmin
            ? ""
            : "linear-gradient(177.64deg, #FFFFFF 1.93%, #43EEFF 42.16%, #A496DE 56.03%)"
        }
        backgroundClip={isAdmin ? "inherit" : "text"}
        style={{
          WebkitTextFillColor: isAdmin ? "" : "transparent",
        }}
        color={isAdmin ? "white" : "inherit"}
      >
        {isAdmin ? "Players" : "Admins"}
      </Text>
    </Button>
  );
};

export default SwitchUsersTypeButton;
