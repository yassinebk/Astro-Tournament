import { IconType } from "@react-icons/all-files/lib";
import { IconButton } from "@chakra-ui/button";
import React from "react";
import { useRouter } from "next/dist/client/router";

interface NavButtonsProps {
  label: string;
  Icon: IconType;
  size?: string;
  link: string;
}

export const NavButtons: React.FC<NavButtonsProps> = ({
  label,
  Icon,
  size,
  link,
}) => {
  const router = useRouter();
  const defaultSize = "";
  const highlightColor = "";
  const basicColor = "";
  return (
    <IconButton
      aria-label={label}
      icon={<Icon size={size ? size : defaultSize} />}
      _hover={{
        bgColor: router.pathname === link ? highlightColor : basicColor,
      }}
    />
  );
};
