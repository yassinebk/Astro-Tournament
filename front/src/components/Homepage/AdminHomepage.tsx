import { IconButton } from '@chakra-ui/button';
import Icon from '@chakra-ui/icon';
import { Flex,Text ,Heading, HStack, VStack } from '@chakra-ui/layout';
import { IoGridOutline } from '@react-icons/all-files/io5/IoGridOutline';
import React from 'react'
import AuthLayout from '../Auth/AuthLayout';

import { IconType } from "@react-icons/all-files";

interface AdminHomepageProps {
    IconSrc: IconType
    text:string
    label:string
    variant:"solid"|"oultine"
}




const AdminHomePageCardsDashboard = ({ label,variant, IconSrc, text }) => {
    return (
        <HStack justifyContent="space-between"
        bgColor={variant==="outline"?"transparent":"#7FD8D8"}
        color={variant==="outline"?"transparent":"#7FD8D8"}
        minW="280px"
        minH="80px"
        >
            <IconButton aria-label={label} icon={<IconSrc />} color="white"
            _focus={{bgColor:"tranparent"}}
            _hover={{bgColor:"tranparent",scale:2,transition:"ease-in 2ms"}}
            _active={{bgColor:"tranparent"}}
            />
            <Text>
                {text}
            </Text>

    </HStack>)
    
}
export const AdminHomepage: React.FC<AdminHomepageProps> = ({}) => (
    <AuthLayout>
        <Flex >
            <HStack>
                <Icon icon={IoGridOutline} size="xl"/>
                    <Heading fontSize="3xl" color="#83CCD3">
                    Dashboard </Heading>
                </HStack>
                

            <VStack>
                
            </VStack>
        </Flex>

    </AuthLayout>
)

export default AdminHomepage;