import Image from "next/image";
import { Box } from "@chakra-ui/layout";
import React from "react";
import "../styles/Logo.module.css";

type LogoProps =
  | {
      width?: number[] | string[];
      height?: number[] | string[];
    }
  | any;

const Logo: React.FC<LogoProps> = ({ width, height, ...props }) => {
  console.log(props);
  return (
    <Box
      {...props}
      marginLeft={
        props.marginLeft !== undefined ? props.marginLeft : [3, 6, 12]
      }
      width={width}
      height={height}
      position="relative"
      display="block"
    >
      <Image
        className="logo"
        layout="responsive"
        width={116}
        height={134}
        src="/assets/logo.png"
      />
    </Box>
  );
};

export default Logo;
