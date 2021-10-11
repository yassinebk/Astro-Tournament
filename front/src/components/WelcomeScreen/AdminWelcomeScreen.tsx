import { Grid, GridItem, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useAllUsersQuery, UserNoPassword } from "../../generated/graphql";
import userLeaderboards from "../../utils/userLeaderboards";
import AuthLoadingScreen from "../Auth/AuthLoadingScreen";
import ThumbButton from "../ThumButton";
import { InfoDiv } from "./InfoDiv";

interface AdminWelcomeScreenProps {
  user: UserNoPassword;
}

const AdminWelcomeScreen: React.FC<AdminWelcomeScreenProps> = ({ user }) => {
  const router = useRouter();
  const [topRankedPlayer, setTopRankedPlayer] = useState("");

  const {
    data: allUsersData,
    loading: allUsersLoading,
    error: allUsersError,
  } = useAllUsersQuery();
  const [totalNumbers, setTotalNumbers] = useState<number>(0);
  useEffect(() => {
    if (allUsersData && !allUsersLoading) {
      setTotalNumbers(
        allUsersData.allUsers.reduce((sum, el) => el.score + sum, 0)
      );
    }
    if (allUsersData && !allUsersLoading) {
      setTotalNumbers(
        allUsersData.allUsers.reduce((sum, el) => el.score + sum, 0)
      );

      setTopRankedPlayer(userLeaderboards(allUsersData.allUsers)[0].username);
      console.log(
        allUsersData.allUsers.reduce((hightestLevel, el) => {
          return hightestLevel;
        }, 0)
      );
    }
  });

  if (!allUsersData) {
    return <AuthLoadingScreen />;
  }
  return (
    <>
      <Grid
        templateColumns="repeat(6,1fr)"
        paddingX="24px"
        gridGap="24px"
        w="100vw"
        justifyContent="center"
        alignItems="center"
        h="full"
        marginTop="30px"
      >
        <GridItem
          colSpan={6}
          fontSize="2xl"
          display="flex"
          flexDir="column"
          justifyContent="flex-start"
          color="white"
        >
          <Heading as="h1">
            Welcome <span style={{ color: "#83CCD3" }}>Username !</span>
          </Heading>
          <Text fontSize="md" fontWeight="hairline" marginTop="8px">
            Here is a quick sum of everything that happned when you were away
          </Text>
        </GridItem>
        <GridItem colStart={1} colEnd={3}>
          <InfoDiv
            display="flex"
            flexDir="column"
            color="white"
            alignContent="center"
            paddingY={4}
            textAlign="center"
          >
            <Heading fontSize="lg" fontWeight="thin">
              Total Number of players
            </Heading>
            <Text
              marginTop="8px"
              fontSize="2xl"
              color="#7FD8D8"
              fontWeight="medium"
            >
              {allUsersData.allUsers.length}
              {/*function to format input with labels*/}
            </Text>
          </InfoDiv>
        </GridItem>
        <GridItem colStart={4} colEnd={7}>
          <InfoDiv
            display="flex"
            flexDir="column"
            color="white"
            alignContent="center"
            paddingY={4}
            textAlign="center"
          >
            <Heading fontSize="lg" fontWeight="thin">
              Total Number of acquired points
            </Heading>
            <Text
              marginTop="8px"
              fontSize="2xl"
              color="#7FD8D8"
              fontWeight="medium"
            >
              {/*function to format input with labels*/}
              {totalNumbers}
            </Text>
          </InfoDiv>
        </GridItem>
        <GridItem colStart={1} colEnd={3}>
          <InfoDiv
            display="flex"
            flexDir="column"
            color="white"
            alignContent="center"
            paddingY={4}
            textAlign="center"
          >
            <Heading fontSize="lg" fontWeight="thin">
              Highest level reached
            </Heading>
            <Text
              marginTop="8px"
              fontSize="2xl"
              color="#7FD8D8"
              fontWeight="medium"
            >
              {allUsersData.allUsers.reduce((hightestLevel, el) => {
                if (parseInt(el.levelNumber) > 0) return hightestLevel;
              }, 0)}
            </Text>
          </InfoDiv>
        </GridItem>
        <GridItem colStart={4} colEnd={7}>
          <InfoDiv
            display="flex"
            flexDir="column"
            color="white"
            alignContent="center"
            paddingY={4}
            textAlign="center"
          >
            <Heading fontSize="lg" fontWeight="thin">
              Top #1 Player
            </Heading>

            <Text
              marginTop="16px"
              fontSize="md"
              color="#7FD8D8"
              fontWeight="medium"
            >
              {topRankedPlayer}
            </Text>
          </InfoDiv>
        </GridItem>
      </Grid>
      <ThumbButton
        dashboard
        onClick={() => {
          router.push(router.asPath + "/dashboard");
        }}
      />
    </>
  );
};

export default AdminWelcomeScreen;
