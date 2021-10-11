import { HStack } from "@chakra-ui/layout";
import { AiOutlineTrophy } from "@react-icons/all-files/ai/AiOutlineTrophy";
import { FiFacebook } from "@react-icons/all-files/fi/FiFacebook";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { VscSettingsGear } from "@react-icons/all-files/vsc/VscSettingsGear";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { NavbarIcon } from "../Navbar/Icon";

interface SideMenuProps {
  logout: () => void;
  control: any;
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  logout,
  control,
  onOpen,
  onClose,
  isOpen,
}) => {
  const [state, setState] = useState<boolean>(isOpen);
  console.log(isOpen);
  useEffect(() => {
    setState(isOpen);
  }, [isOpen]);

  return (
    <HStack
      initial={{
        x: -30,
      }}
      as={motion.div}
      animate={control}
      zIndex={1}
      display={state ? "flex" : "none"}
      animation="ease-in"
      transitionDuration="300ms"
      transition="all"
      spacing={6}
      marginLeft="33px"
      paddingLeft="30px"
      position="absolute"
      z-index="-1"
      bgColor="rgba(0,0,0,1)"
      w="fit-content"
      paddingRight="30px"
      h="80px"
      top="7px"
      left="58PX"
      borderRadius="0px 60px 60px 0px"
    >
      <NavbarIcon
        label="Facebook"
        Icon={FiFacebook}
        link="facebook.com"
        _hover={{
          color: "blue",
        }}
        variant="unstyled"
      />
      <NavbarIcon
        label="Trophy"
        Icon={AiOutlineTrophy}
        link="leaderboard"
        _hover={{
          color: "gold",
        }}
        variant="unstyled"
      />
      <NavbarIcon
        label="Settings"
        Icon={VscSettingsGear}
        link="settings"
        variant="unstyled"
        _hover={{
          color: "gray.800",
        }}
      />
      <NavbarIcon
        label="Logout"
        variant="unstyled"
        _hover={{
          color: "red.600",
        }}
        color="#E07676"
        Icon={IoExitOutline}
        onClick={logout}
      />
    </HStack>
  );
};

export default SideMenu;
