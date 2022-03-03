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
import { useRouter } from 'next/router'


const Login = ({ width, height, padding }) => {

  const route = useRouter()

  const serverStatus = 0
  
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const submitLogin = async(e) =>{
    const response = await fetch('/api/login',{
      method : 'POST',
      body : JSON.stringify({email,password}),
      headers: {
        'Content-Type' : 'application/json'
      },
    })
    const data = await response.json()
    serverStatus = data.serverStat
    console.log(serverStatus)
    if(serverStatus == 200){
      route.push("/portal")
    }
    else{
      route.push('/')
    }
    // Router.push("/portal")
  }
  return (
    <Container centerContent p={padding}>
      <Box width={width} height={height}>
        <FormControl>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            id='email'
            type='email'
            size='sm'
            variant='outline'
            borderColor='gray.400'
            _hover={{ borderColor: 'gray.600' }}
            focusBorderColor='black'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <FormLabel htmlFor='password'>Password</FormLabel>
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <a href='/signup'>sign up</a>
          <br />
          {/* <NextLink href='/' passHref> */}
            {/* <Link> */}
              <IconButton
                aria-label='Login'
                icon={<ArrowForwardIcon />}
                mt={4}
                colorScheme='blue'
                onClick={submitLogin}
              >
                Login
              </IconButton>
            {/* </Link> */}
          {/* </NextLink> */}
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
export async function getServerSideProps({req,res}){
  console.log(req.body.email)
}