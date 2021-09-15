import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { BsQuestionSquareFill } from "@react-icons/all-files/bs/BsQuestionSquareFill";
import { FiSun } from "@react-icons/all-files/fi/FiSun";
import { IoIosPodium } from "@react-icons/all-files/io/IoIosPodium";
import { MdSubject } from "@react-icons/all-files/md/MdSubject";
import { VscRocket } from "@react-icons/all-files/vsc/VscRocket";
import Image from "next/image";
import React from "react";

interface CardProp {
  styles?: any;
}
interface CardsProps {}

const Card: React.FC<CardProp> = ({ children, styles }) => {
  return (
    <VStack
      spacing={[4, 8]}
      marginBottom="20px"
      height={["300px", "300px", "400px", "390px", "552px"]}
      marginX="30px"
      maxW="500px"
      width={["80vw", "80vw", "90vw", "300px", "390px"]}
      borderRadius="20px"
      justifyContent="center"
      bg="linear-gradient(27.84deg, rgba(163, 157, 226, 0.19) 14.9%, rgba(175, 199, 202, 0.66) 69.36%)"
      backdropFilter="blur(1.19702px)"
      boxShadow="0.798016px 0.798016px 7.17008px 5.97507px rgba(255, 255, 255, 0.32)"
      padding={["12px", "22px", "22px", "32px"]}
      {...styles}
    >
      {children}
    </VStack>
  );
};
export const Cards: React.FC<CardsProps> = ({}) => {
  return (
    <VStack
      spacing={[12]}
      color="white"
      justifyItems="center"
      alignItems="center"
      paddingX={["auto", "auto", "auto", "54px"]}
    >
      <Heading
        color="white"
        marginX="auto"
        fontSize={["2xl", "3xl", "4xl", "6xl"]}
        marginBottom="20px"
      >
        Come Join Us in This Journey
      </Heading>

      <Flex flexDir={["column", "column", "column", "row"]}>
        <Card>
          <Heading
            fontSize={["xl", "2xl", "3xl"]}
            bg="linear-gradient(180deg, #A68888 0%, rgba(22, 46, 255, 0.75) 100%)"
            bgClip="text"
          >
            Free Entry
          </Heading>
          <FiSun color="#7152F0" style={{ width: "80px", height: "80px" }} />
        </Card>
        <Card>
          <Heading
            margin="auto"
            textAlign="center"
            fontSize={["lg", "xl", "2xl", "2xl", "3xl"]}
            bg="linear-gradient(180deg, #A68888 0%, rgba(22, 46, 255, 0.75) 100%)"
            bgClip="text"
          >
            A competition where you test your Astromical Knwoledge
          </Heading>
          <VStack
            spacing={[4, 4, 4, 4, 9]}
            margin="auto"
            justifyContent="space-around"
            alignItems="flex-start"
          >
            <HStack spacing={4}>
              <BsQuestionSquareFill
                color="#7152F0"
                style={{ width: "60px", height: "60px" }}
              />
              <Text
                color="#E1FCFF"
                fontSize={["sm", "md", "md", "20px", "28px"]}
                fontWeight="bold"
              >
                Many Questions
              </Text>
            </HStack>
            <HStack spacing={4}>
              <MdSubject
                color="#7152F0"
                style={{ width: "50px", height: "50px" }}
              />
              <Text
                color="#E1FCFF"
                fontSize={["sm", "md", "md", "20px", "28px"]}
                fontWeight="bold"
              >
                Different Topics
              </Text>
            </HStack>
            <HStack spacing={4}>
              <IoIosPodium
                color="#7152F0"
                style={{ width: "50px", height: "50px" }}
              />
              <Text
                fontSize={["sm", "md", "md", "20px", "28px"]}
                color="#E1FCFF"
                fontWeight="bold"
              >
                Real Time Leaderboards
              </Text>
            </HStack>
          </VStack>
        </Card>
        <Card>
          <Heading
            fontSize={["xl", "2xl", "3xl"]}
            bg="linear-gradient(180deg, #A68888 0%, rgba(22, 46, 255, 0.75) 100%)"
            bgClip="text"
            textAlign="center"
          >
            Different Prizes
          </Heading>
          <Text as="h3" fontSize="28px" textAlign="center">
            The Winner will have the chane to visit the moon
          </Text>
          <HStack>
            <VscRocket
              color="#7152F0"
              style={{ width: "102px", height: "102px" }}
            />
            <Image src="/assets/moon.png" width="102px" height="102px" />
          </HStack>
        </Card>
      </Flex>
    </VStack>
  );
};
