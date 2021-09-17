import React, { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { BsChevronBarUp } from "@react-icons/all-files/bs/BsChevronBarUp";

interface ScrollToTopBtnProps {}

export const ScrollToTopBtn: React.FC<ScrollToTopBtnProps> = ({}) => {
  const [visible, setVisible] = useState(false);
  const [currentY, setCurrentY] = useState(0);
  useEffect(() => {
    setCurrentY(0);
  }, []);

  return (
    <IconButton
      onScroll={() => {
        console.log(window ? window.scrollY : "hi");
        setCurrentY(window.scrollY);
      }}
      position="absolute"
      right={5}
      color="white"
      bottom={5}
      display={visible ? "block" : "none"}
      icon={<BsChevronBarUp />}
      aria-label="Scroll to top"
    />
  );
};

export default ScrollToTopBtn;
