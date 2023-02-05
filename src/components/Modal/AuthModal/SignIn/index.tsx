import React, { useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { authModalState } from '../../../../atoms/authModalAtom';
import { auth } from '../../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../../firebase/errors';

const SignIn: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const [formError, setFormError] = useState('');
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError('');
        if (loginForm.password.length < 6) {
            setFormError('Password can not have less than 6 characters');
            return;
        }
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                required
                name='email'
                placeholder='Email'
                type="email"
                mb={2}
                onChange={handleChange}
                fontSize='10pt'
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: '#fff',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg='gray.50'
            />
            <Input
                required
                name='password'
                placeholder='Password'
                type="password"
                mb={2}
                onChange={handleChange}
                fontSize='10pt'
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: '#fff',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg='gray.50'
            />
            <Button isLoading={loading} width='100%' height='36px' my={2} type='submit'>Sign in</Button>
            <Flex justifyContent='center' mt={5} fontSize='9pt' gap={1}>
                <Text>Forgot your password?</Text>
                <Text color='blue.500' fontWeight='700' cursor='pointer' onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: 'resetPassword'
                }))}>Reset</Text>
            </Flex>
            <Flex
                fontSize='9pt'
                justifyContent='center'
                mt={5}
                gap={1}
            >
                <Text>New here?</Text>
                <Text color='blue.500' fontWeight='700' cursor='pointer' onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: 'signup'
                }))}>Sign up</Text>
            </Flex>
            {(formError || error) && (<Text textAlign='center' color='red.400' fontSize='10pt' mt={5} fontWeight='700'>{formError || FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>)}
        </form>
    )
}

export default SignIn;