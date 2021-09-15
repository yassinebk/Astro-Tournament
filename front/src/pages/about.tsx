import {
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Container } from "../components/NoAuth/Container";
import { Footer } from "../components/Footer";
import GridImage from "../components/NoAuth/GridImage";
import ImageGallery from "../components/NoAuth/ImageGallery";
import { Navbar } from "../components/Navbar";
import withApollo from "../utils/createApolloClient";

interface aboutProps {}

interface Image {
  src: string;
  alt?: string;
}

// const items = Array(1, 2, 34, 5, 6, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,).map((e, i) => {
//     if (i >= 4) {
//         return <GridItem
//             bgColor="black"
//             borderRadius="20px"
//             minW="150px"
//             minH="150px"
//             colSpan={[2, 2, "auto"]}

//             h={["200px", "250px", "250px"]}
//             w='auto' >
//         </GridItem>
//     }
//     return (

//         //<GridItem bgColor="white"

//         //     //w={["auto", "auto", "250px", "250px",]}
//         //     h={["150px", "200px", "250px", "250px"]}
//         //     minW="150px" borderRadius="20px" minH="150px" colSpan={[1, "auto"]} ></GridItem>)
//     )
// })

const images: Array<Image> = [
  {
    src: "https://picsum.photos/id/1018/1000/600/",
    alt: "https://picsum.photos/id/1018/250/150/",
  },
  {
    src: "https://picsum.photos/id/1015/1000/600/",
    alt: "https://picsum.photos/id/1015/250/150/",
  },
  {
    src: "https://picsum.photos/id/1019/1000/600/",
    alt: "https://picsum.photos/id/1019/250/150/",
  },
  {
    src: "https://picsum.photos/id/1018/1000/600/",
    alt: "https://picsum.photos/id/1018/250/150/",
  },
  {
    src: "https://picsum.photos/id/1018/1000/600/",
    alt: "https://picsum.photos/id/1018/250/150/",
  },
  {
    src: "https://picsum.photos/id/1018/1000/600/",
    alt: "https://picsum.photos/id/1018/250/150/",
  },
];
export const About: React.FC<aboutProps> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [clickedImage, setClickedImage] = useState<number>(0);

  const clickHandler = (index: number) => {
    setClickedImage(index);
    onOpen();
  };
  return (
    <Container>
      <Navbar />
      <Grid
        // marginBottom="3vh"
        paddingX="9%"
        h="auto"
        marginTop="10%"
        w="100vw"
        height="100%"
        templateColumns={[
          "repeat(2,1fr)",
          "repeat(2,1,fr)",
          "repeat(3,1fr)",
          "repeat(4,1fr)",
          "repeat(4,1fr)",
          "repeat(5,1fr)",
        ]}
        gap={[6]}
      >
        {images.map((element, index) => {
          console.log(isOpen);
          return (
            <GridImage
              key={index + element.src}
              index={index}
              src={element.src}
              onClick={clickHandler as any}
              alt={`here ${element.alt}`}
            />
          );
        })}
      </Grid>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        size="full"
      >
        <ModalOverlay backdropFilter="backdrop-filter: blur(30px)" />
        <ModalContent
          width="100vw"
          h="50vh"
          display="flex"
          bg="linear-gradient(180deg, rgba(46, 23, 67, 0.8) 55%, rgba(11, 134, 146, 0.538) 100%)"
          flexDir="column"
          justifyContent="flex-start"
          alignItems="center"
          marginTop={100}
        >
          <ModalHeader
            color="white"
            position="relative"
            paddingY="40px"
            w={["95vw", "90vw", "90vw"]}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontSize={["3xl", "2xl", "3xl"]}
          >
            <ModalCloseButton
              position="absolute"
              left={0}
              top={10}
              fontSize="30px"
            />
            <Heading fontSize="4xl">Gallery </Heading>
          </ModalHeader>
          <ModalBody maxW="100vw" paddingX={0}>
            <ImageGallery
              imageList={images}
              startIndex={clickedImage}
              onClose={onClose}
            />
            ;
          </ModalBody>
        </ModalContent>
      </Modal>
      <Footer />
    </Container>
  );
};

export default withApollo({ ssr: true })(About);
