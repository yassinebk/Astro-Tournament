import React from "react";
import { Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";

const Overview = () => {
  return (
    <HStack
      isFullWidth="true"
      spacing="4"
      width="full"
      border="thin"
      shadow="md"
      borderColor="crimson"
    >
      <Button as={Link} to="/Level">
        Levels Editor
      </Button>
      <Button as={Link} to="/Questions">
        Questions Editor
      </Button>
    </HStack>
  );
};

export default Overview;
