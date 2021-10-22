import { Img } from "@chakra-ui/image";
import { GridItem } from "@chakra-ui/layout";
import React, { MouseEventHandler } from "react";

interface GridImageProps {
  src: string;
  alt?: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
  index: number;
}

export const GridImage: React.FC<GridImageProps> = (props) => {
  const { src, width, alt, height, index } = props;
  //const specialPic = index % 4 === 0 ? 2 : 1;
  return (
    <GridItem
      key="src"
      borderRadius="20px"
      colSpan={[1, "auto"]}
      onClick={props.onClick}
    >
      <Img
        src={src}
        alt={alt}
        minW="150px"
        minH="200px"
        h={["150px", "200px", "250px", "250px"]}
        borderRadius="20px"
      />
    </GridItem>
  );
};

export default GridImage;
