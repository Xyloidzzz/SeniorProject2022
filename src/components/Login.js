import {
  Container,
  Box,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Link,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const Login = ({ width, height }) => {
  return (
    <Container centerContent p='5'>
      <Box width={width} height={height}>
        <FormControl>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input id='username' type='username' size='sm' />
          <FormLabel htmlFor='username'>Password</FormLabel>
          <Input id='password' type='password' size='sm' />
          <NextLink href='/classlist' passHref>
            <Link>
              <IconButton
                aria-label='Login'
                icon={<ArrowForwardIcon />}
                mt={4}
                colorScheme='blue'
                type='submit'
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
}

export default Login
