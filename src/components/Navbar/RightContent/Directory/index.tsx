import React from 'react'
import { Menu, MenuButton, Flex, Icon, MenuList, MenuItem, MenuDivider, Text } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { AiOutlineHome } from 'react-icons/ai'
import { auth } from '../../../../firebase/clientApp'
import Communities from './Communities'

const Directory: React.FC = () => {
    return (
        <Menu>
            <MenuButton padding='0px 6px' borderRadius={4} _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
                <Flex align='center' gap={1}>
                    <Flex alignItems='center' gap={2}>
                        <Icon as={AiOutlineHome} fontSize={20} />
                        <Text lineHeight={1} mt={1} fontWeight='600' fontSize='10pt' display={{ base: 'none', lg: 'inline-block' }}>Home</Text>
                    </Flex>
                    <ChevronDownIcon mt={0.5} />
                </Flex>
            </MenuButton>
            <MenuList>
                <Communities />
            </MenuList>
        </Menu>
    )
}

export default Directory