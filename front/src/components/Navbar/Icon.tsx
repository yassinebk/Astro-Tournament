import { IconButton } from "@chakra-ui/button";
import { IconType } from "@react-icons/all-files";
import { Props } from "framer-motion/types/types";
import NextLink from "next/link";
import React from "react";

interface IconProps {
  label: string;
  Icon: IconType;
  color?: string;
  link?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NavbarIcon: React.FC<Props> = ({
  label,
  Icon,
  color,
  onClick,
  link,
  ...props
}) => {
  const StyledIconButton = () => (
    <IconButton
      onClick={onClick}
      aria-label={label}
      bgColor="transparent"
      color={color ? color : "#BDCACB"}
      size="30px"
      w="60px"
      {...props}
      h="60px"
      icon={<Icon />}
    />
  );

  if (link) {
    return (
      <NextLink href={link}>
        <StyledIconButton />
      </NextLink>
    );
  }
  return <StyledIconButton />;
};
