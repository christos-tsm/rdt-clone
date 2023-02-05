import React from 'react'
import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { User } from 'firebase/auth'

const Search: React.FC<{ user?: User | null }> = ({ user }) => {
    return (
        <Flex flexGrow={1} maxWidth={user ? 'auto' : '600px'} mr={2} align='center'>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                    height='34px'
                />
                <Input
                    type='text'
                    fontSize={'10pt'}
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{ bg: '#fff', border: '1px solid', borderColor: 'blue.500' }}
                    _focus={{ outline: 'none', border: '1px solid', borderColor: 'blue.500' }}
                    height="34px"
                    bg="gray.50"
                    placeholder='Search..' />
            </InputGroup>
        </Flex>
    )
}

export default Search