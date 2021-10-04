import { IconButton } from "@chakra-ui/button";
import { IoGridOutline } from "@react-icons/all-files/io5/IoGridOutline";
import React from "react";
import { RESPONSIVE_DISPLAY_MB } from "../constant";

interface ThumButtonProps {
  dashboard: boolean;
  onClick: () => void;
}

export const ThumbButton: React.FC<ThumButtonProps> = ({
  onClick,
  dashboard,
}) => (
  <IconButton
    display={["flex", "flex", "flex", "none"]}
    onClick={onClick}
    rounded="full"
    h="85px"
    w="85px"
    fontWeight="light"
    _hover={{
      transform: "scale(0.9,0.9)",
      transition: "transform ease 300ms",
    }}
    icon={
      <IoGridOutline
        style={{ color: "white", fontSize: "50px", fontWeight: "lighter" }}
      />
    }
    aria-label="thumb button"
    bg=" linear-gradient(94.71deg, rgba(52, 15, 64, 0.72) 0%, #0C818F 100%)"
    position="absolute"
    bottom={"5%"}
    right="5%"
  />
);

export default ThumbButton;
