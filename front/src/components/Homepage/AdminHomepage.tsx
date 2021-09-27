import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "@react-icons/all-files";
import { AiOutlineMessage } from "@react-icons/all-files/ai/AiOutlineMessage";
import { AiOutlineQuestion } from "@react-icons/all-files/ai/AiOutlineQuestion";
import { AiOutlineStar } from "@react-icons/all-files/ai/AiOutlineStar";
import { IoGridOutline } from "@react-icons/all-files/io5/IoGridOutline";
import { RiUser3Line } from "@react-icons/all-files/ri/RiUser3Line";
import NextLink from "next/link";
import React from "react";
import { replaceRouterLastPath } from "../../utils/routerNav";
import { Sidebar } from "../Sidebar";

interface AdminHomepageCardProps {
  IconSrc: IconType;
  text: string;
  label: string;
  variant: "solid" | "outline";
  link: string;
}

interface AdminHomepageProps {}

const AdminHomePageCardsDashboard: React.FC<AdminHomepageCardProps> = ({
  label,
  variant,
  IconSrc,
  text,
  link,
}) => {
  return (
    <NextLink href={link}>
      <Button
        aria-label={label}
        icon={<IconSrc />}
        justifyContent="space-around"
        bgColor={variant === "outline" ? "transparent" : "#7FD8D8"}
        color={variant === "outline" ? "transparent" : "#7FD8D8"}
        variant={variant}
        minW="280px"
        minH="80px"
        size="lg"
        _focus={{ bgColor: "tranparent" }}
        _hover={{ bgColor: "tranparent", scale: 2, transition: "ease-in 2ms" }}
        _active={{ bgColor: "tranparent" }}
      >
        <IconSrc color="white" fontSize="50px" />
        <Text w="full" color={variant === "solid" ? "white" : "#7FD8D8"}>
          {text}
        </Text>
      </Button>
    </NextLink>
  );
};
export const AdminHomepage: React.FC<AdminHomepageProps> = ({}) => {
  return (
    <>
      <Grid templateColumns="repeat(12,1fr)">
        <GridItem colSpan={1}>
          <Sidebar />
        </GridItem>
      </Grid>
      <Flex
        w="100vw"
        flexDir="column"
        paddingX="8%"
        paddingY="10%"
        display={["block", "block", "block", "none"]}
      >
        <HStack>
          <IoGridOutline
            size="xl"
            fontSize={2}
            style={{ color: "white", width: "30px", height: "30px" }}
          />
          <Heading fontSize="3xl" color="#83CCD3">
            Dashboard{" "}
          </Heading>
        </HStack>

        <VStack spacing={8} marginTop={12}>
          <AdminHomePageCardsDashboard
            link={replaceRouterLastPath("dashboard", "admin/levelEditor")}
            text="Edit Levels"
            IconSrc={AiOutlineStar}
            label="edit levels"
            variant="outline"
          />
          <AdminHomePageCardsDashboard
            link={replaceRouterLastPath("dashboard", "admin/questionsEditor")}
            text="Edit Queestions"
            IconSrc={AiOutlineQuestion}
            label="edit questions"
            variant="outline"
          />
          <AdminHomePageCardsDashboard
            link={replaceRouterLastPath("dashboard", "admin/usersList")}
            text="List of Users"
            IconSrc={RiUser3Line}
            label="list of Users"
            variant="outline"
          />
          <AdminHomePageCardsDashboard
            link="/"
            text="List of Users"
            IconSrc={AiOutlineMessage}
            label="Send a "
            variant="solid"
          />
        </VStack>
      </Flex>
    </>
  );
};

export default AdminHomepage;
