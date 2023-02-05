import { Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const NotFound: React.FC = () => {
    return (
        <Flex gap={10} direction='column' justifyContent='center' alignItems='center' minHeight='60vh'>
            <Text fontSize='14pt' fontWeight='700' color='gray.500'>Sorry, that community does not exist or has been banned.</Text>
            <Link href='/'>
                <Button>Go to homepage</Button>
            </Link>
        </Flex >
    )
}

export default NotFound