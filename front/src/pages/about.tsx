import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react'
import { Container } from '../components/Container';
import { Navbar } from '../components/Navbar';

interface aboutProps {

}

interface image {
    src: string,
    alt?: string
    width?: number | string,
    height?: number | string
}

const items = Array(1, 2, 34, 5, 6, 7, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,).map((e, i) => {
    if (i >= 4) {
        return <GridItem
            bgColor="black" borderRadius="20px" minW="150px" minH="150px" colSpan={[2, 2, "auto"]} w='auto' >
        </GridItem>
    }
    return (<GridItem bgColor="white" minW="150px" borderRadius="20px" minH="150px" colSpan={[1, "auto"]} h="auto"></GridItem>)
})
console.log("items", items)

const images: Array<image> = []
export const About: React.FC<aboutProps> = ({ }) => {
    return (<Container>
        <Navbar />
        <Grid
            paddingX="5%"
            marginTop="3%"
            w="100vw"
            height="100%"
            templateColumns={["repeat(2,1fr)", "repeat(2,1,fr)", "repeat(3,1fr)", "repeat(4,1fr)", "repeat(5,1fr)"]}
            gap={[6]}
        >

            {items}



        </Grid>
    </Container>);
}

export default About;