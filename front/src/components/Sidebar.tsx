import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, VStack } from "@chakra-ui/layout";
import React from "react";
import Logo from "./Logo";
import { IoGridOutline } from "@react-icons/all-files/io5/IoGridOutline";
import { AiOutlineTrophy } from "@react-icons/all-files/ai/AiOutlineTrophy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="flex-start"
      h="100vh"
      maxW="150px"
      minW="131px"
      display={["none", "none", "none", "flex"]}
      flexDir="column"
      bgColor="#0E0D0D"
    >
      <Logo />
      <VStack
        borderBottom="1px solid #FFFF"
        color="white"
        h="40%"
        justifyContent="space-around"
        fontSize="5xl"
      >
        <IconButton
          aria-label="Options"
          icon={<BsThreeDotsVertical size="70px" />}
          backgroundColor="transparent"
        />
        <IconButton
          aria-label="Leaderboards"
          bgColor="transparent"
          icon={<AiOutlineTrophy size="70px" />}
        />
        <IconButton
          aria-label="Dashboard"
          bgColor="transparent"
          icon={<IoGridOutline size="70px" />}
        />
      </VStack>
      <VStack alignItems="center" justifyContent="center">
        <FaUserAstronaut />

        <Box>
          <Heading>_Username_</Heading>
          <Heading>Admin</Heading>
        </Box>
      </VStack>
    </Flex>
  );
};
