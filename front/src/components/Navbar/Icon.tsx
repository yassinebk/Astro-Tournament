import { IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { IconType } from "@react-icons/all-files";
import React from "react";

interface IconProps {
  label: string;
  Icon: IconType;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NavbarIcon: React.FC<IconProps> = ({
  label,
  Icon,
  color,
  onClick,
}) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label={label}
      bgColor="transparent"
      color={color ? color : "#BDCACB"}
      size="30px"
      w="60px"
      h="60px"
      icon={<Icon />}
    />
  );
};
