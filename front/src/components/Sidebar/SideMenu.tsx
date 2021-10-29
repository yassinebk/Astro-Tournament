import { HStack } from "@chakra-ui/layout";
import { AiOutlineTrophy } from "@react-icons/all-files/ai/AiOutlineTrophy";
import { FiFacebook } from "@react-icons/all-files/fi/FiFacebook";
import { IoExitOutline } from "@react-icons/all-files/io5/IoExitOutline";
import { VscSettingsGear } from "@react-icons/all-files/vsc/VscSettingsGear";
import { motion, useMotionValue, useTransform } from "framer-motion";
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

  const x = useMotionValue(0);
  const opacity = useTransform(x, [-30, 0, 200], [0, 1, 0]);
  const variants = {
    open: { opacity: 1, x: 0, backgroundColor: "#0E0D0D", display: "block" },
    closed: {
      opacity: 0,
      x: "-30%",
      backgroundColor: "black",
      display: "none",
    },
    initial: {
      opacity: 0,
      x: "-30%",
      backgroundColor: "black",
      display: "none",
    },
  };
  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      initial="initial"
      variants={variants}
      style={{
        position: "absolute",
        top: "-10px",
        left: "58PX",
        zIndex: 2,
        borderRadius: "0px 60px 60px 0px",
      }}
      transition={{ duration: 0.5, type: "tween" }}
    >
      <HStack
        zIndex={1}
        display="flex"
        animation="ease-in"
        transitionDuration="300ms"
        transition="all"
        spacing={6}
        marginLeft="33px"
        paddingLeft="30px"
        w="fit-content"
        paddingRight="30px"
        h="80px"
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
    </motion.div>
  );
};

export default SideMenu;
