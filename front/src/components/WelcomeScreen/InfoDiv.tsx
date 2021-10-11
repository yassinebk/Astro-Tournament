import { Box } from "@chakra-ui/react";
import { Props } from "framer-motion/types/types";
import React from "react";

export const InfoDiv: React.FC<Props> = (props: any) => {
  return (
    <Box
      {...props}
      bg="linear-gradient(145.22deg, rgba(194, 194, 194, 0.21) 0%, rgba(245, 245, 245, 0.06) 36.46%, rgba(255, 255, 255, 0.1747) 97.4%), linear-gradient(145.22deg, rgba(104, 99, 99, 0.21) 0%, rgba(0, 0, 0, 0.0646875) 97.4%, rgba(245, 245, 245, 0.06) 100%)"
      borderRadius="15px"
      minW={props.minW ? props.minW : "156px"}
      minH={props.minH ? props.minH : "140px"}
    >
      {props.children}
    </Box>
  );
};
