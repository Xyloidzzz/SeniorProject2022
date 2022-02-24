import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  IconButton,
  Link,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useState } from 'react'

const Login = ({ width, height, padding }) => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Container centerContent p={padding}>
      <Box width={width} height={height}>
        <FormControl>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input
            id='username'
            type='username'
            size='sm'
            variant='outline'
            borderColor='gray.400'
            _hover={{ borderColor: 'gray.600' }}
            focusBorderColor='black'
          />
          <FormLabel htmlFor='username'>Password</FormLabel>
          <InputGroup size='sm'>
            <Input
              id='password'
              type={show ? 'text' : 'password'}
              pr='4.5rem'
              size='sm'
              variant='outline'
              borderColor='gray.400'
              _hover={{ borderColor: 'gray.600' }}
              focusBorderColor='black'
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <a href="">sign up</a><br/>
          <NextLink href='/portal' passHref>
            <Link>
              <IconButton
                aria-label='Login'
                icon={<ArrowForwardIcon />}
                mt={4}
                colorScheme='blue'
              >
                Login
              </IconButton>
            </Link>
          </NextLink>
        </FormControl>
      </Box>
    </Container>
  )
}
Login.defaultProps = {
  width: '200px',
  padding: '5',
}

export default Login
