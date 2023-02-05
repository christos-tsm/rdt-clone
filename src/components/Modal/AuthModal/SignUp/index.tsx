import React, { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

import { authModalState } from '../../../../atoms/authModalAtom';
import { auth, firestore } from '../../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../../firebase/errors';
import { User } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

const SignUp: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [formError, setFormError] = useState('');
    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [createUserWithEmailAndPassword, userCred, loading, error] = useCreateUserWithEmailAndPassword(auth);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formError) setFormError('');
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }
        if (signUpForm.password.length < 6) {
            setFormError('Password must contain at least 6 characters');
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    }

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const createUserDocument = async (user: User) => {
        await addDoc(collection(firestore, 'users'), JSON.parse(JSON.stringify(user)));
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
            <Input
                required
                name='confirmPassword'
                placeholder='Confirm your password'
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
            <Button isLoading={loading} width='100%' height='36px' my={2} type='submit'>Sign up</Button>
            <Flex
                fontSize='9pt'
                justifyContent='center'
                mt={5}
            >
                <Text mr={1}>Already have an account?</Text>
                <Text color='blue.500' fontWeight='700' cursor='pointer' onClick={() => setAuthModalState(prev => ({
                    ...prev,
                    view: 'login'
                }))}>Sign in</Text>
            </Flex>
            {(formError || error) && (<Text textAlign='center' color='red.400' fontSize='10pt' mt={5} fontWeight='700'>{formError || FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>)}
        </form>
    )
}

export default SignUp