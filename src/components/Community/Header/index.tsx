import { Box, Button, Flex, Icon, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaReddit } from 'react-icons/fa'
import { Community } from '../../../atoms/communitiesAtom'

const CommunityHeader: React.FC<{ communityData: Community }> = ({ communityData }) => {
    const isJoined = false;
    return (
        <Flex direction='column' height='146px' >
            <Box height='50%' bg='blue.400' />
            <Flex justify='center' bg='#fff' flexGrow={1}>
                <Flex width='95%' maxWidth='860px'>
                    {communityData.imageURL ? (
                        <Image />
                    ) : (
                        <Icon
                            as={FaReddit}
                            position='relative'
                            top='-10px'
                            fontSize={64}
                            color='blue.500'
                            border='inset 4px solid #fff'
                            borderRadius='50%'
                        />
                    )}
                    <Flex padding='10px 16px'>
                        <Flex direction='column' mr={6}>
                            <Text fontWeight='700' fontSize='16pt'>{communityData.id}</Text>
                            <Text fontWeight='600' fontSize='9pt' color='gray.400'>r/{communityData.id}</Text>
                        </Flex>
                        <Button variant={isJoined ? 'outline' : 'solid'} height='30px' px={6} onClick={() => { }}>
                            {isJoined ? 'Joined' : 'Join'}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default CommunityHeader