import { Text, HStack, Flex } from "@chakra-ui/layout";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <Flex
      flexDir={["column", "row", "row"]}
      alignItems="center"
      paddingX={[4, 6, 8, 12]}
      paddingY={[4, 6]}
      color="white"
      justifyContent="space-between"
      w="100vw"
      marginTop={["20px", "30px", "40px"]}
      maxW="1240px"
      fontSize={["14px", "14px", "14px", "18px"]}
      fontWeight="bold"
    >
      <Text>Email : ajst@gmail.com</Text>
      <Text>Contact Number : +21655872362</Text>
      <Text>All rights reserved @2021</Text>
    </Flex>
  );
};
