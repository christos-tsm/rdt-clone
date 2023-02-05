import React, { useState } from 'react'
import { Flex, MenuItem, Icon, Text } from '@chakra-ui/react'
import { GrAdd } from 'react-icons/gr'
import CreateCommunityModal from '../../../../Modal/CreateCommunityModal'

const Communities = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
            <MenuItem _hover={{ bg: 'gray.100' }} onClick={() => setOpen(true)}>
                <Flex align='center' gap={2}>
                    <Icon as={GrAdd} fontSize={20} />
                    <Text fontSize='10pt'>Create Community</Text>
                </Flex>
            </MenuItem>
        </>
    )
}

export default Communities