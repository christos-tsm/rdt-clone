import React, { useState } from 'react'
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { Button, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Text, Input, Divider, Stack, Checkbox, Flex } from '@chakra-ui/react'
import { BsFillEyeFill, BsPersonFill } from 'react-icons/bs';
import { HiLockClosed } from 'react-icons/hi';
import { auth, firestore } from '../../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

const CreateCommunityModal: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
    const [user] = useAuthState(auth);
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError('');
        // Prevent > 21 chars community names
        if (e.target.value.length > 21) return;
        // Recalculate chars remaining
        setCharsRemaining(21 - e.target.value.length);
        // Set value to communityName
        setCommunityName(e.target.value);
    }

    const handleCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(e.target.name);
    }

    const handleCreateCommunity = async () => {
        // Validate community name
        const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

        if (format.test(communityName) || communityName.length < 3) {
            setError('Community names must be between 3-21 characters and can only contain letters, numbers, underscores');
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            /**
             * Create the community document in firestore
             * Check if name is not taken, if not create community
             * @param Object firestore -- imported from clientApp
             * @param String 'communities' -- which collection we are looking at
             * @param String communityName -- id of the document ( not the document itself, just a reference )
             */
            const communityDocRef = doc(firestore, 'communities', communityName);
            await runTransaction(firestore, async (transaction) => {
                const communityDoc = await transaction.get(communityDocRef);
                if (communityDoc.exists()) {
                    throw new Error(`Sorry, r/${communityName} is already taken, try another one`);
                }
                // Create community
                transaction.set(communityDocRef, {
                    creatorId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType
                });

                // create communitySnippet on User
                transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName,
                    isModerator: true,
                });

            });


        } catch (err: any) {
            console.log('handleCreateCommunity error:', error);
            setError(err.message);
        }
        setLoading(false);
    }

    return (
        <Modal isOpen={open} onClose={handleClose} size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader display='flex' flexDirection='column' fontSize={15} py={3} px={4}>
                    Create a Community
                </ModalHeader>
                <Divider />
                <Box>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDirection='column' py={5} px={4}>
                        <Text fontWeight='600' fontSize='12pt'>Name</Text>
                        <Text fontSize='9pt' color='gray.500'>Community Names including capitalization can not be changed</Text>
                        <Text position='relative' top='28px' left='10px' width='20px' color='gray.400'>r/</Text>
                        <Input position='relative' size='sm' pl="22px" value={communityName} onChange={handleChange} />
                        <Text color={charsRemaining === 0 ? 'red.400' : 'gray.500'} fontSize='9pt' mt={2}>{charsRemaining} Characters remaining</Text>
                        {error && <Text color="red.400" fontSize='9pt' mt={2} fontWeight='700'>{error}</Text>}
                        <Box my={8}>
                            <Text fontWeight={600} fontSize='12pt'>Community Type</Text>
                            <Stack spacing={3} mt={2}>
                                <Checkbox name='public' onChange={handleCommunityTypeChange} isChecked={communityType === 'public'}>
                                    <Flex align='center'>
                                        <Icon as={BsPersonFill} color='gray.500' />
                                        <Text fontSize='10pt' ml={1} mr={2}>Public</Text>
                                        <Text fontSize='8pt'>Anyone can view, post and comment to this community</Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox name='restricted' onChange={handleCommunityTypeChange} isChecked={communityType === 'restricted'}>
                                    <Flex align='center'>
                                        <Icon as={BsFillEyeFill} color='gray.500' />
                                        <Text fontSize='10pt' ml={1} mr={2}>Restricted</Text>
                                        <Text fontSize='8pt'>Anyone can view this community, but only approved users can post</Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox name='private' onChange={handleCommunityTypeChange} isChecked={communityType === 'private'}>
                                    <Flex align='center'>
                                        <Icon as={HiLockClosed} color='gray.500' />
                                        <Text fontSize='10pt' ml={1} mr={2}>Private</Text>
                                        <Text fontSize='8pt'>Only approved users can view and submit to theis community</Text>
                                    </Flex>
                                </Checkbox>
                            </Stack>
                        </Box>
                    </ModalBody>
                </Box>
                <ModalFooter bg='gray.100' borderRadius='0px 0px 10px 10px'>
                    <Button isLoading={loading} variant='outline' height='30px' mr={3} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button isLoading={loading} height='30px' onClick={handleCreateCommunity}>Create Community</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CreateCommunityModal