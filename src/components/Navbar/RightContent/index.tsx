import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'

import AuthModal from '../../Modal/AuthModal'
import AuthButtons from './AuthButtons'
import { auth } from '../../../firebase/clientApp'
import Icons from './Icons'
import UserMenu from './UserMenu'

const RightContent: React.FC<{ user?: User | null }> = ({ user }) => {

    return (
        <>
            <AuthModal />
            <Flex justify='center' align='center' gap={1}>
                {user ? <Icons /> : <AuthButtons />}
                <UserMenu user={user} />
            </Flex>
        </>
    )
}

export default RightContent