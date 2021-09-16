import { useApolloClient } from "@apollo/client";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineMessage } from "@react-icons/all-files/ai/AiOutlineMessage";
import { AiOutlineTrophy } from "@react-icons/all-files/ai/AiOutlineTrophy";
import { FiFacebook } from "@react-icons/all-files/fi/FiFacebook";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { IoGridOutline } from "@react-icons/all-files/io5/IoGridOutline";
import { VscSettingsGear } from "@react-icons/all-files/vsc/VscSettingsGear";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Role } from "../../generated/graphql";
import Logo from "../Logo";
import { NavbarIcon } from "./Icon";
interface AuthNavbarProps {
  role: Role;
}

export const AuthNavbar: React.FC<AuthNavbarProps> = ({ role }) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const apolloClient = useApolloClient();
  const logout = async () => {
    localStorage.removeItem("authUser");
    await apolloClient.resetStore();
    router.push("/");
  };
  const router = useRouter();
  const DropDownContent = () => {
    if (role === "ADMIN")
      return (
        <>
          <NavbarIcon label="Dashboard" Icon={IoGridOutline} />
          <NavbarIcon label="Trophy" Icon={AiOutlineTrophy} />
          <NavbarIcon label="Settings" Icon={VscSettingsGear} />
          <NavbarIcon
            label="Logout"
            color="#E07676"
            Icon={IoExitOutline}
            onClick={logout}
          />
        </>
      );
    return (
      <>
        <NavbarIcon label="Trophy" Icon={AiOutlineTrophy} />
        <NavbarIcon label="Messages" Icon={AiOutlineMessage} />
        <NavbarIcon
          label="Social Media Facebook"
          color="facebook.900"
          Icon={FiFacebook}
        />
        <NavbarIcon label="Settings" Icon={VscSettingsGear} />
        <NavbarIcon
          color="#D03636"
          label="Logout"
          Icon={IoExitOutline}
          onClick={logout}
        />
      </>
    );
  };
  return (
    <HStack
      boxShadow="0px 4px 4px rgba(221, 218, 218, 0.25)"
      miH="110px"
      bgColor="#181717"
      paddingY={[3, 5]}
      paddingX={[2, 4, 6, 8, 16]}
      justifyContent={["space-between"]}
      alignContent="center"
      wrap="nowrap"
      width="100vw"
      fontSize={["xs", "small", "md", "lg", "xl"]}
      color="white"
      display={["flex", "flex", "flex", "flex", "none"]}
    >
      <Logo
        width={["48px", "60px", "80px"]}
        height={["48px", "60px", "80px"]}
      />
      <Button
        ref={btnRef}
        onClick={onOpen}
        className="navbarDropdown"
        _hover={{ bg: "transparent" }}
        _expanded={{ bg: "#253659" }}
        _focus={{ boxShadow: "outline" }}
        as={IconButton}
        aria-label="more options"
        icon={<HamburgerIcon />}
        variant="ghost"
        color="#39A2DD"
        fontSize="4xl"
        bgColor="transparent"
        display={["inline-block"]}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay
          bg=" linear-gradient(180deg, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0.1) 94.79%)"
          backdropBlur="20px"
          marginTop="20%"
          marginBottom="5%"
        />
        <DrawerContent
          maxW="768px"
          maxH="662px"
          marginY="auto"
          color="white"
          bgColor="transparent"
        >
          <DrawerBody paddingTop="68px">
            <DrawerCloseButton
              position="absolute"
              left={4}
              top={4}
              fontSize={23}
            />
            <VStack
              color="white"
              justifyContent="space-around"
              alignItems="center"
              minW="70px"
              minH="500px"
              fontSize="50px"
            >
              <DropDownContent />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default AuthNavbar;
