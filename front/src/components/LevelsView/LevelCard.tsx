import { Text,Button, Circle, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import Image from "next/image"
import { Level } from "../../generated/graphql";

interface LevelCardProps {
  level:Level
  
  
  answeredQuestions
}

export const LevelCard: React.FC<LevelCardProps> = ({level,answeredQuestions}) => {
  return ( <VStack
        padding={4}
        bg="linear-gradient(163.67deg, rgba(48, 51, 51, 0.78) 2.7%, rgba(57, 155, 165, 0.51) 99.55%)"
        minW="305px"
        border="1px solid #FEFEFE"
        borderRadius="40px"
    >
      <Circle size="180px"
      bg="linear-gradient(151.77deg, #B5BCFF 21.56%, rgba(50, 129, 255, 0.08) 82.53%)"
      >
            <Circle position="relative" size="150px" overflow="hidden">
                <Text
                zIndex={2}
               color="red.400"
               fontSize="24px"
                
                    left={50}
                    translateX="-50%"
                    fontWeight="black"
                >1</Text>
        <Image src="/../public/assets/planet.jpg" layout="fill"/>
            </Circle>
        </Circle>
        <Heading  color="white">
            The Planets
        </Heading>

        
        <Text as="h2"
        color="#0BD3FF"
        fontWeight="bold" 
        fontSize="22px"
        >
        {answeredQuestions}/{level.Questions.length}
        </Text>
        <Button display="flex" flexDir="row"
        bgColor=" #7FD8D8"
        color="blackAlpha.900"
        alignItems="center"
        justifyContent="space-between"
        
        minW="185px"
        minH="55px"
        >
            <Image src="/../public/assets/flat-ui_rocket.png" width="20px" height="20px"/>
            <Text>Travel to {level.name}</Text>

        </Button>

    </VStack>)
};

export default LevelCard;
