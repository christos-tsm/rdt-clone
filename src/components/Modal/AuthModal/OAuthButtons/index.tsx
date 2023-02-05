import React, { useEffect } from 'react'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth, firestore } from '../../../../firebase/clientApp';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    }

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred])

    return (
        <Flex direction='column' width='100%' mb={4} gap={3}>
            <Button variant='outline' onClick={() => signInWithGoogle()} isLoading={loading}>
                <Image src='/images/googlelogo.png' height='20px' mr={5} ml={-5} /> Continue with Google
            </Button>
            {error && <Text textAlign='center' color='red.400' fontSize='10pt' mt={5} fontWeight='700'>{error.message}</Text>}
            {/* <Button variant='outline'>Other Provider</Button> */}
        </Flex>
    )
}

export default OAuthButtons