import React, { useEffect } from "react";
import { useReactiveVar, useQuery } from "@apollo/client";
import {
  VStack,
  Box,
  Text,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { allUsersState } from "../../store";
import { ALL_USERS } from "../../queries/User";

const Leaderboard = () => {
  const users = useReactiveVar(allUsersState);
  const result = useQuery(ALL_USERS);

  useEffect(() => {
    if (result.data && result.data.allUsers) {
      console.log("fetched user List ", result.data);
      allUsersState(result.data.allUsers);
    }
  });

  if (!users || users.length === 0) {
    return (
      <Box>
        <Text>There are no Participants for now go back Later !</Text>
      </Box>
    );
  }
  return (
    <VStack>
      <Table variant="simple">
        <TableCaption> Leaderboards </TableCaption>
        <Thead>
          <Tr>
            <Th> ID </Th>
            <Th> username</Th>
            <Th> Score</Th>
            <Th>Level</Th>
          </Tr>
          {users.map((u) => {
            return (
              <Tr>
                <Td>{u.id}</Td>
                <Td>{u.username}</Td>
                <Td>{u.score}</Td>
                <Td>{u.level.number}</Td>
              </Tr>
            );
          })}
        </Thead>
      </Table>
    </VStack>
  );
};

export default Leaderboard;
