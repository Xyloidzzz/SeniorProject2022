import { Box, Divider, Flex, Heading, Spacer, VStack, Button, Link, IconButton, FormLabel } from '@chakra-ui/react'
import NextLink from 'next/link'
import { signOut } from 'next-auth/react'
import { BiLogOut } from 'react-icons/bi'
const adminPg = () =>{

return (
    <Flex width='full' height='full' p='8' mx='auto'>
      <Box flex='1' width='full' >
        <VStack width='full' spacing='15px' align='left'>
          <Heading width='full'> Admin Settings </Heading>
          <Divider />
          <Spacer/>
          <FormLabel>Add a new Student</FormLabel>
          <NextLink href="/adminStudent">
            <Link>
              <Button colorScheme='blue' size='lg' >Add</Button>
            </Link>
          </NextLink>
          <br></br>

          <FormLabel>Add a new Professor</FormLabel>
          <NextLink href="/adminInstructor">
            <Link>
              <Button colorScheme='blue' size='lg'>Add</Button>
            </Link>
          </NextLink>
          <br></br>

          <FormLabel>Add a new Class (for educator)</FormLabel>
          <NextLink href="/ListsofIAdmin">
            <Link>
              <Button colorScheme='blue' size='lg' >Add</Button>
            </Link>
          </NextLink>
          <br></br>

          <FormLabel>Add a new Class (for student)</FormLabel>
          <NextLink href="/ListsofSAdmin">
            <Link>
              <Button colorScheme='blue' size='lg' >Add</Button>
            </Link>
          </NextLink>
          <br></br>

          <FormLabel>Create Class</FormLabel>
          <NextLink href="/createCls">
            <Link>
              <Button colorScheme='blue' size='lg' >Add</Button>
            </Link>
          </NextLink>
          <br></br>

          <FormLabel>Create Section</FormLabel>
          <NextLink href="/createSec">
            <Link>
              <Button colorScheme='blue' size='lg' >Add</Button>
            </Link>
          </NextLink>
          <br></br>

          <Spacer/>
          <IconButton
              aria-label='logout'
              size='lg'
              icon={<BiLogOut />}
              onClick={() => signOut({ callbackUrl: '/' })}
            ></IconButton>
        </VStack>
      </Box>
    </Flex>
  )
}

export  default adminPg