import { Flex, Icon } from '@chakra-ui/react';
import React from 'react'
import { BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs'
import { GrAdd } from 'react-icons/gr';
import { IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline } from 'react-icons/io5';

const Icons = () => {
    return (
        <Flex>
            <Flex display={{ base: 'none', md: 'flex' }} align='center' borderRight='1px solid' borderColor='gray.200' marginRight={2} paddingRight={2}>
                <Flex padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: 'gray.200' }} fontSize={19}>
                    <Icon as={BsArrowUpRightCircle} />
                </Flex>
                <Flex padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: 'gray.200' }} fontSize={22}>
                    <Icon as={IoFilterCircleOutline} />
                </Flex>
                <Flex padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: 'gray.200' }} fontSize={22}>
                    <Icon as={IoVideocamOutline} />
                </Flex>
            </Flex>
            <>
                <Flex display={{ base: 'none', md: 'flex' }} padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: 'gray.200' }} fontSize={19}>
                    <Icon as={BsChatDots} />
                </Flex>
                <Flex padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: 'gray.200' }} fontSize={20}>
                    <Icon as={IoNotificationsOutline} />
                </Flex>
                <Flex padding={1} cursor='pointer' borderRadius={4} _hover={{ bg: 'gray.200' }} fontSize={20}>
                    <Icon as={GrAdd} />
                </Flex>
            </>
        </Flex>
    )
}

export default Icons