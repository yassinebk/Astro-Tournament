import { HamburgerIcon } from "@chakra-ui/icons";
import {
  HStack,
  Link,
  Button,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Logo from "../Logo";
import NextLink from "next/link";

interface NoAuthNavbarProps {}

export const NoAuthNavbar: React.FC<NoAuthNavbarProps> = ({}) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
  return (
    <HStack
      paddingY={[3, 5]}
      paddingX={[2, 4, 6, 8, 16]}
      background="linear-gradient(90.69deg, rgba(227, 231, 247, 0.013) 0%, rgba(227, 231, 247, 0.13) 97.93%)"
      bgBlendMode="soft-light"
      borderRadius="0px 0px 45px 45px"
      justifyContent={["space-between"]}
      alignContent="center"
      border="1px solid "
      wrap="nowrap"
      width="100vw"
      fontSize={["xs", "small", "md", "lg", "xl"]}
      style={{
        borderImageSource:
          "linear-gradient(90.11deg, #00BEFF 3.47%, #2D306B 105.44%)",
      }}
      //paddingY={4}
      color="white"
    >
      <Logo
        width={["48px", "60px", "80px"]}
        height={["48px", "60px", "80px"]}
      />
      <HStack
        className="defaultNavbar"
        fontSize={["20px", "22px", "xl", "lg", "2xl"]}
        fontWeight="bold"
        height="100%"
        justifyContent={[
          "space-between",
          "space-around",
          "space-around",
          "space-between",
        ]}
        alignItems="center"
        w={["55%", "80%"]}
        maxW="800px"
        paddingRight={["2px", "8px", "12px", "48px"]}
      >
        <NextLink href="/">
          <Link>Home</Link>
        </NextLink>
        <NextLink href="/about">
          <Link display={["none", "inline-block", "inline-block"]}>About</Link>
        </NextLink>
        <NextLink href="/contact">
          <Link display={["none", "none", "inline-block"]}>Contact us</Link>
        </NextLink>
        <NextLink href="/signup">
          <Button
            colorScheme="teal"
            variant="solid"
            fontSize="inherit"
            height={[8, 12, 16]}
            display={["none", "none", "inline-block"]}
          >
            Compete Now
          </Button>
        </NextLink>
        <Button
          ref={btnRef}
          onClick={onOpen}
          className="navbarDropdown"
          _hover={{ bg: "transparent" }}
          _expanded={{ bg: "#253659" }}
          _focus={{ boxShadow: "outline" }}
          as={IconButton}
          aria-label="more options"
          icon={<HamburgerIcon />}
          variant="ghost"
          color="#39A2DD"
          fontSize="4xl"
          bgColor="transparent"
          display={["inline-block", "inline-block", "none", "none"]}
        />
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          finalFocusRef={btnRef}
          size="full"
        >
          <DrawerOverlay height="70vh" />
          <DrawerContent
            maxW="900px"
            background="linear-gradient(180deg, rgba(0, 0, 0, 0.9) 20%, rgba(41, 39, 78, 0.5) 100%)"
            maxH="380px"
            marginY="auto"
            color="white"
            backdropBlur="100px"
          >
            <DrawerCloseButton position="absolute" left={4} fontSize={23} />
            <DrawerBody>
              <VStack
                width="full"
                marginY="auto"
                spacing={[10, 14]}
                paddingY={["10%"]}
                height="auto"
                maxH="380px"
                fontSize="24px"
                justifyContent="space-around"
                alignItems="center"
              >
                <Box>
                  <NextLink href="/">
                    <Link>Home</Link>
                  </NextLink>
                </Box>

                <Box>
                  <NextLink href="/contact">
                    <Link>Contact us</Link>
                  </NextLink>
                </Box>
                <Box>
                  <NextLink href="/signin">Signin</NextLink>
                </Box>
                <NextLink href="/signup">
                  <Button
                    colorScheme="teal"
                    variant="solid"
                    fontSize="inherit"
                    minH="50px"
                  >
                    Compete Now
                  </Button>
                </NextLink>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </HStack>
  );
};
