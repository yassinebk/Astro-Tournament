import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, VStack } from "@chakra-ui/layout";
import React from "react";
import Logo from "./Logo";
import { IoGridOutline } from "@react-icons/all-files/io5/IoGridOutline";
import { AiOutlineTrophy } from "@react-icons/all-files/ai/AiOutlineTrophy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Flex
      alignContent="center"
      justifyItems="flex-start"
      h="100vh"
      maxW="150px"
      minW="131px"
      display={["none", "none", "none", "block"]}
      bgColor="#0E0D0D"
    >
      <Logo />
      <VStack borderBottom="1px solid #FFFF">
        <IconButton aria-label="Options" icon={<BsThreeDotsVertical />} />
        <IconButton aria-label="Leaderboards" icon={<AiOutlineTrophy />} />
        <IconButton aria-label="Dashboard" icon={<IoGridOutline />} />
      </VStack>
      <VStack alignItems="center" justifyContent="center">
        <FontAwesomeIcon
          icon={["fal", "user-astronaut"]}
          color="#b2f8ff"
          size="xs"
        />
        <Box>
          <Heading>_Username_</Heading>
          <Heading>Admin</Heading>
        </Box>
      </VStack>
    </Flex>
  );
};
