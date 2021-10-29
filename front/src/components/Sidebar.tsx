import { useApolloClient } from "@apollo/client";
import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, VStack } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import { AiOutlineTrophy } from "@react-icons/all-files/ai/AiOutlineTrophy";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import { FaUserAstronaut } from "@react-icons/all-files/fa/FaUserAstronaut";
import { IoGridOutline } from "@react-icons/all-files/io5/IoGridOutline";
import { animate, motion, useAnimation } from "framer-motion";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import Logo from "./Logo";
import SideMenu from "./Sidebar/SideMenu";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const router = useRouter();
  const client = useApolloClient();
  const logout = async () => {
    localStorage.removeItem("authUser");
    await client.resetStore();
    router.push("/");
  };
  const controlAnimation = useAnimation();
  const toggleSideMenu = () => {
    if (isOpen) {
      onClose();
    } else {
      controlAnimation.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      });

      onOpen();
    }
  };
  const sideBarStyleActive = {
    color: "#0BD3FF",
  };
  return (
    <Flex
      zIndex={4}
      alignItems="center"
      alignContent="center"
      justifyContent="flex-start"
      h="100%"
      maxW="150px"
      minW="131px"
      display={["none", "none", "none", "flex"]}
      flexDir="column"
      bgColor="#0E0D0D"
      paddingTop="40px"
    >
      <NextLink href="/" as="div">
        <Logo
          width={[70]}
          height={[70]}
          marginLeft={0}
          marginX={"auto"}
          display="flex"
          flexDir="column"
          alignContent="center"
        />
      </NextLink>

      <VStack
        w="60%"
        spacing={"40px"}
        marginTop="40%"
        paddingBottom="30px"
        borderBottom="1px solid #FFFF"
        color="white"
        h="40%"
        justifyContent="space-around"
        fontSize="5xl"
      >
        <Box position="relative" h="fit-content" w="fit-content">
          <IconButton
            z-index={1}
            _focus={sideBarStyleActive}
            _active={sideBarStyleActive}
            _hover={sideBarStyleActive}
            color={isOpen ? "#0BD3FF" : "#FFFFF"}
            size="lg"
            h="fit-content"
            variant="unstyled"
            aria-label="Options"
            icon={<BsThreeDotsVertical size="50px" />}
            backgroundColor="transparent"
            onClick={toggleSideMenu}
          />
          <SideMenu
            control={controlAnimation}
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            logout={logout}
          />
        </Box>
        <IconButton
          variant="unstyled"
          _focus={sideBarStyleActive}
          _active={{ ...sideBarStyleActive }}
          _hover={sideBarStyleActive}
          h="fit-content"
          aria-label="Leaderboards"
          bgColor="transparent"
          icon={<AiOutlineTrophy size="50px" />}
        />
        <IconButton
          variant="unstyled"
          _focus={sideBarStyleActive}
          _active={sideBarStyleActive}
          _hover={sideBarStyleActive}
          h="fit-content"
          aria-label="Dashboard"
          bgColor="transparent"
          icon={<IoGridOutline size="50px" />}
        />
      </VStack>
      <VStack
        w="full"
        alignItems="center"
        justifyContent="center"
        paddingX="8px"
        marginTop="50%"
      >
        <FaUserAstronaut
          width="60px"
          height="60px"
          fontSize="60px"
          style={{
            color: "B2F8FF",
          }}
        />
        <Box fontSize="18px">
          <Heading fontSize="inherit" color="white">
            _Username_
          </Heading>

          <Heading
            marginTop="8px"
            fontSize="24px"
            textAlign="center"
            fontWeight="black"
            color="#0B8793"
          >
            Admin
          </Heading>
        </Box>
      </VStack>
    </Flex>
  );
};
