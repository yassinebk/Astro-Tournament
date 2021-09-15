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
import { GrUserAdd } from "@react-icons/all-files/gr/GrUserAdd";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { IoGridOutline } from "@react-icons/all-files/io5/IoGridOutline";
import { VscSettingsGear } from "@react-icons/all-files/vsc/VscSettingsGear";
import React from "react";
import { Role } from "../../generated/graphql";
import Logo from "../Logo";

interface AuthNavbarProps {}

export const AuthNavbar: React.FC<AuthNavbarProps> = ({}) => {
  const role = "ADMIN";
  const { onOpen, isOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const DropDownContent = () => {
    if (role === "ADMIN")
      return (
        <>
          <IconButton aria-label="Dashboard" icon={<IoGridOutline />} />
          <IconButton aria-label="Add person" icon={<GrUserAdd />} />
          <IconButton aria-label="Trophy" icon={<AiOutlineTrophy />} />
          <IconButton aria-label="Settings" icon={<VscSettingsGear />} />
          <IconButton
            aria-label="Logout"
            color="#D03636"
            icon={<IoExitOutline />}
          />
        </>
      );
    return (
      <>
        <IconButton aria-label="Trophy" icon={<AiOutlineTrophy />} />
        <IconButton aria-label="Messages" icon={<AiOutlineMessage />} />
        <IconButton
          aria-label="Social Media Facebook"
          color="facebook.900"
          icon={<FiFacebook />}
        />
        <IconButton aria-label="Settings" icon={<VscSettingsGear />} />
        <IconButton
          color="#D03636"
          aria-label="Logout"
          icon={<IoExitOutline />}
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
          bg=" linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.1) 94.79%)"
          backdropBlur="20px"
          marginTop="20%"
          marginBottom="5%"
        />
        <DrawerContent
          maxW="768px"
          maxH="662px"
          marginY="auto"
          color="white"
          backdropBlur="100px"
        >
          <DrawerCloseButton position="absolute" left={4} fontSize={23} />
          <DrawerBody>
            <VStack fontSize="xl" color="white">
              <DropDownContent />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HStack>
  );
};

export default AuthNavbar;
