import { Img } from '@chakra-ui/image';
import { GridItem } from '@chakra-ui/layout';
import React, { ComponentProps, MouseEventHandler } from 'react'

interface GridImageProps {
 src: string,
    alt?:string
    onClick: MouseEventHandler<HTMLDivElement>;
    width?: number | string,
    height?:number|string
}

export const GridImage: React.FC<GridImageProps> = ( props) => {
    const
        { src, width, alt, height } = props;
    return (
        <GridItem onClick={props.onClick}>
            <Img src={src} alt={alt}/>
            </GridItem>
        );
}