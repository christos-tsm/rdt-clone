import React, { useEffect } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Text } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { useAuthState } from 'react-firebase-hooks/auth';
import { authModalState } from '../../../atoms/authModalAtom'
import AuthInputs from './AuthInputs'
import OAuthButtons from './OAuthButtons'
import { auth } from '../../../firebase/clientApp';
import ResetPassword from './ResetPassword';

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            handleClose();
        }
        console.log(user);
    }, [user]);

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false
        }))
    }

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign='center'>
                        {modalState.view === 'login' && 'Sign In'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDirection='column' alignItems='center' justifyContent='center' pb={10}>
                        <Flex direction='column' align='center' justify='center' width='70%'>
                            {modalState.view === 'login' || modalState.view === 'signup' ?
                                <>
                                    <OAuthButtons />
                                    <Flex alignItems='center' width='100%' gap={2}>
                                        <hr style={{ height: '2px', width: '100px' }} />
                                        <Text color='gray.400' flex={1} textAlign='center'>OR</Text>
                                        <hr style={{ height: '2px', width: '100px' }} />
                                    </Flex>
                                    <AuthInputs />
                                </>
                                :
                                <ResetPassword />
                            }

                        </Flex>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal