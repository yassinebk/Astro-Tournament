import React, { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { BsChevronBarUp } from "@react-icons/all-files/bs/BsChevronBarUp";

interface ScrollToTopBtnProps {}

export const ScrollToTopBtn: React.FC<ScrollToTopBtnProps> = ({}) => {
  const [visible, setVisible] = useState(true);
  const [currentY, setCurrentY] = useState(0);
  useEffect(() => {
    setCurrentY(0);
  }, []);

  useEffect(() => {
    setVisible(window?.scrollY > 450);
  }, []);

  return (
    <IconButton
      animation="ease-out"
      transition="all"
      transitionDuration="400ms"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      position="absolute"
      right={5}
      variant="unstyled"
      border="0.2px solid white "
      borderRadius="20px"
      bgColor="purple.900"
      color="white"
      bottom={5}
      display={visible ? "flex" : "none"}
      icon={<BsChevronBarUp />}
      aria-label="Scroll to top"
    />
  );
};

export default ScrollToTopBtn;
