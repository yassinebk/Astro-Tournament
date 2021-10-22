import { Text } from "@chakra-ui/layout";
import React, { CSSProperties } from "react";
import { InfoDiv } from "../WelcomeScreen/InfoDiv";

interface CallForPlayProps {
  level: number;
  questionsLeft: number;

  spanStyle: CSSProperties;
  pointsToCollect: number;
}

const Info = ({ text, number }) => {
  return (
    <Text fontSize="16px" fontWeight="bold" textAlign="left">
      <span style={{ color: "#7FD8D8" }}>{number}</span> {" " + text}
    </Text>
  );
};
export const CurrentPlayerInGameInfo: React.FC<CallForPlayProps> = ({
  pointsToCollect,
  spanStyle,
  level,
  questionsLeft,
}) => {
  return (
    <InfoDiv
      w="full"
      display="flex"
      flexDir="column"
      color="white"
      alignItems="flex-start"
      justifyContent="center"
      paddingX="16px"
    >
      <Text>
        <span style={spanStyle}>48</span> Questions left
      </Text>
      <Text>
        <span style={spanStyle}>12</span> Planets not visited
      </Text>
      <Text>
        <span style={spanStyle}>40000</span> Points to collect
      </Text>
    </InfoDiv>
  );
};

export default CurrentPlayerInGameInfo;
