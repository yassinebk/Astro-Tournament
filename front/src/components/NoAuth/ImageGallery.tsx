/* eslint-disable no-unused-vars */
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, IconButton, Img, Text } from "@chakra-ui/react";
import React, { MouseEventHandler, useState } from "react";
import { useKeyPress } from "../../utils/useKeyboardEvent";

interface Image {
  src: string;
  alt?: string;
}
interface ImageGalleryProps {
  startIndex: number;
  imageList: Array<Image>;
  onClose: MouseEventHandler<HTMLDivElement>;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  startIndex,
  imageList,
}) => {
  const useNavigations = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const increment = () => {
      if (imageIndex === imageList.length - 1) setImageIndex(0);
      else setImageIndex(imageIndex + 1);
    };

    const decrement = () => {
      if (imageIndex === 0) setImageIndex(imageList.length - 1);
      else setImageIndex(imageIndex - 1);
    };
    const resetIndex = () => {
      setImageIndex(0);
    };

    const handleNextImagePress = (event: KeyboardEvent) => {
      console.log(event);
    };
    const handlePreviousImagePress = (event) => {
      console.log(event);
    };
    return {
      nextImage: increment,
      prevImage: decrement,
      handleNextImagePress,
      handlePreviousImagePress,
      currentImage: imageIndex,
      firstImage: resetIndex,
    };
  };

  const imagesNav = useNavigations();
  const leftArrowKey = useKeyPress("ArrowLeft", imagesNav.nextImage);
  const rightArrowKey = useKeyPress("ArrowRight", imagesNav.nextImage);

  return (
    <Box
      maxW="997px"
      w="auto"
      overflow="hidden"
      display="flex"
      position="relative"
      flexDir="row"
      zIndex={2}
      justifyContent={["stretch", "stretch", "stretch", "center"]}
      alignItems="center"
      fontSize="50px"
    >
      <IconButton
        _hover={{ bgColor: "teal" }}
        aria-label="Previous image"
        icon={<ChevronLeftIcon />}
        onClick={imagesNav.prevImage}
        variant="ghost"
        color="white"
        fontSize="2xl"
        size="3xl"
        position="absolute"
        left={0}
      />
      <Box
        zIndex={-1}
        //w="100%"
        w="auto"
        position="relative"
        display="flex"
        dir="column"
        alignItems="center"
      >
        {/**/}
        <Img
          borderRadius="20px"
          maxH="605px"
          maxW="900px"
          src={imageList[imagesNav.currentImage].src}
          w="100vw"
          h="80%"
          //w={["100vw", "100vw", "100vw", "80vw"]}
        />
        <Text
          color="white"
          position="absolute"
          bottom={5}
          fontSize="14px"
          marginX="auto"
          width="50px"
          textAlign="center"
          left={0}
          right={0}
        >
          {imagesNav.currentImage + 1} / {imageList.length}
        </Text>
        {/* */}
      </Box>
      <IconButton
        aria-label="Next image"
        _hover={{ bgColor: "teal" }}
        icon={<ChevronRightIcon />}
        color="white"
        fontSize="2xl"
        variant="ghost"
        size="3xl"
        right={0}
        position="absolute"
        onClick={imagesNav.nextImage}
      />
    </Box>
  );
};

export default ImageGallery;
