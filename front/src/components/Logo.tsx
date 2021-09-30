import { Img } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import React from "react";
import "../styles/Logo.module.css";

interface LogoProps {
  width?: number[] | string[];
  height?: number[] | string[];
}

const Logo: React.FC<LogoProps> = ({ width, height }) => (
  <Box
    marginLeft={[3, 6, 12]}
    height="auto"
    width="70px"
    position="relative"
    display="block"
  >
    <Img
      className="logo"
      layout="responsive"
      width={width}
      height={height}
      src="/assets/logo.png"
    />
  </Box>
);

export default Logo;
