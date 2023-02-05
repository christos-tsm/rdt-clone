import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { authModalState } from '../../../../atoms/authModalAtom'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

const AuthInputs: React.FC = () => {
    const modalState = useRecoilValue(authModalState);

    return (
        <Flex direction='column' align='center' width='100%' mt={4}>
            {modalState.view === 'login' && <SignIn />}
            {modalState.view === 'signup' && <SignUp />}
        </Flex>
    )
}

export default AuthInputs