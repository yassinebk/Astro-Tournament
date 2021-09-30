import { IconButton } from "@chakra-ui/button";
import { IconType } from "@react-icons/all-files";
import NextLink from "next/link";
import React from "react";

interface IconProps {
  functional?: boolean;
  label: string;
  link?: string;
  Icon: IconType;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NavbarIcon: React.FC<IconProps> = ({
  label,
  Icon,
  link,
  color,
  onClick,
  functional = false,
}) => {
  if (functional) {
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
  }
  return (
    <NextLink href={link}>
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
    </NextLink>
  );
};
