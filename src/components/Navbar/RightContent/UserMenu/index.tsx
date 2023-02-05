import React from 'react'
import { Menu, MenuButton, Button, MenuList, MenuItem, Icon, Flex, Text, MenuDivider } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { signOut, User } from 'firebase/auth'
import { auth } from '../../../../firebase/clientApp';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../../atoms/authModalAtom';

const UserMenu: React.FC<{ user?: User | null }> = ({ user }) => {
    const setAuthModalState = useSetRecoilState(authModalState);

    return (
        <Menu>
            <MenuButton padding='0px 6px' borderRadius={4} _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}>
                {user ?
                    <Flex gap={1} alignItems='center'>
                        <Flex alignItems='center'>
                            <Icon as={FaRedditSquare} fontSize={26} color='gray.300' />
                        </Flex>
                        <Flex direction='column' display={{ base: "none", lg: 'flex' }} fontSize="8pt" align='flex-start'>
                            <Text fontWeight='700'>
                                {user?.displayName || user.email?.split('@')[0]}
                            </Text>
                            <Flex alignItems='center'>
                                <Icon as={IoSparkles} color="brand.100" mr={1} />
                                <Text color='gray.400'>1 Karma</Text>
                            </Flex>
                        </Flex>
                        <ChevronDownIcon />
                    </Flex>
                    :
                    <Flex alignItems='center'>
                        <Icon fontSize={24} color='gray.400' mr={1} as={VscAccount} />
                        <ChevronDownIcon />
                    </Flex>
                }
            </MenuButton>
            <MenuList>
                {
                    user ?
                        <>
                            <MenuItem fontSize='10pt' _hover={{ bg: 'blue.500', color: "#fff" }}>
                                <Flex align='center' gap={2}>
                                    <Icon as={CgProfile} fontSize={22} />
                                    <Text fontWeight='700'>Profile</Text>
                                </Flex>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem fontSize='10pt' _hover={{ bg: 'blue.500', color: "#fff" }} onClick={() => signOut(auth)}>
                                <Flex align='center' gap={2}>
                                    <Icon as={MdOutlineLogin} fontSize={22} />
                                    <Text fontWeight='700'>Logout</Text>
                                </Flex>
                            </MenuItem>
                        </>
                        :
                        <>
                            <MenuItem fontSize='10pt' _hover={{ bg: 'blue.500', color: "#fff" }} onClick={() => setAuthModalState({ open: true, view: 'login' })}>
                                <Flex align='center' gap={2}>
                                    <Icon as={MdOutlineLogin} fontSize={22} />
                                    <Text fontWeight='700'>Sign in / Sign up</Text>
                                </Flex>
                            </MenuItem>
                        </>
                }
            </MenuList>
        </Menu>
    )
}

export default UserMenu