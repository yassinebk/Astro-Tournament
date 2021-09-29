import { Box, Heading, VStack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";

interface CountdownProps {}

const calculateTimeLeft = ({ day, month }) => {
  let year = new Date().getFullYear();

  let difference = +new Date(`11/11/${year}`) - +new Date();

  console.log(difference);
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    return timeLeft;
  }
};

const Countdown: React.FC<CountdownProps> = ({}) => {
  const [timeLeftForEvent, setTimeLeft] = useState<any>(0);

  const timePassing = async () => {
    await setTimeout(() => {
      setTimeLeft(calculateTimeLeft({ day: 13, month: 11 }));
    }, 1000);
  };


  return (
    <VStack
      marginY={["20px", "40px", "58px"]}
      spacing="8"
      paddingX={["16px", "32px"]}
      paddingY="16"
      color="white"
      maxH="480px"
    >
      <Heading fontSize={["xl", "2xl", "3xl", "6xl"]}>
        Countdown for the Rocket 🚀🚀 Launch
      </Heading>
      <Box
        margin="auto"
        bg=" linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))"
        borderRadius="30px"
        padding={["12px", "24px"]}
      >
        <Heading color="#CEFBFF" fontSize={["2xl", "4xl", "6xl"]}>
          {timeLeftForEvent.days}:{timeLeftForEvent.hours}:
          {timeLeftForEvent.minutes}:{timeLeftForEvent.seconds}
        </Heading>
      </Box>
    </VStack>
  );
};
export default Countdown;
