import { Box, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import ThumbButton from "../ThumButton";

interface CallForPlayProps {}

export const CallForPlay: React.FC<CallForPlayProps> = ({}) => {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <Box
      h="auto"
      animation="all ease-in"
      transitionDuration="800ms"
      color="white"
      display="flex"
      flexDir="row"
      w="full"
      marginTop="12px"
      paddingX={["16px", "24px", "10%"]}
      position="relative"
    >
      <VStack h="85px" w={["140px", "180px", "240px"]}>
        <Text textAlign="left" w="full" fontSize="xl">
          What are you waiting for ?
        </Text>
        <Text textAlign="left" w="full" fontSize="2xl">
          Tap <span style={{ color: "#3CD1DF" }}>Explore</span>{" "}
        </Text>
      </VStack>
      <Box marginTop="73px" marginLeft="-5">
        <svg
          width="118"
          height="16"
          viewBox="0 0 118 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M117 0L112.004 2.89304L117.007 5.7735L117 0ZM0.971111 13.3095C41.3603 15.647 67.7333 16.1334 85.065 14.6739C102.367 13.2169 110.813 9.81229 115.15 4.20635L114.359 3.59444C110.305 8.83417 102.263 12.2221 84.9811 13.6774C67.728 15.1303 41.4191 14.6488 1.02889 12.3112L0.971111 13.3095Z"
            fill="white"
          />
        </svg>
      </Box>
      <ThumbButton
        dashboard={false}
        onClick={() => router.push(router.asPath + "/player/levels")}
      />
    </Box>
  );
};

export default CallForPlay;
