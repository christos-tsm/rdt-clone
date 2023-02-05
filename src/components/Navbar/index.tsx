import React from 'react'
import { Flex, Image } from '@chakra-ui/react'
import RightContent from './RightContent'
import Search from './Search'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/clientApp'
import Directory from './RightContent/Directory'

const Navbar: React.FC = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <Flex bg='#fff' height="44px" padding="6px 12px" gap={2} justifyContent={{ md: 'space-between' }}>
            <Flex align='center' width={{ base: '40px', md: 'auto' }} mr={{ base: 0, md: 2 }}>
                <Image src='/images/redditFace.svg' height={30} />
                <Image src='/images/redditText.svg' height={46} display={{ base: 'none', md: 'unset' }} />
            </Flex>
            {user && <Directory />}
            <Search user={user} />
            <RightContent user={user} />
        </Flex>
    )
}

export default Navbar