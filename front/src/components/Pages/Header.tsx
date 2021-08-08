import { useReactiveVar } from "@apollo/client";
import React from "react";
import { userState } from "../../store";
import { Stack, Text } from "@chakra-ui/layout";

const Header = () => {
  const user = useReactiveVar(userState);
    if (!user) return null;
  return (
    <Stack>
      <Text as="h1" fontSize="6xl">
        Welcome our {user.role}   
        <Text as="span" fontSize="6xl" textColor="purple.600">
          {user.username}
        </Text>
      </Text>
    </Stack>
  );
};

export default Header;
