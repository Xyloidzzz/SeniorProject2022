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
  useToast,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Login = ({ width, height, padding }) => {

  const toast = useToast()

  const route = useRouter()

  const serverStatus = 0

  const [showMssg,setShowMssg] = useState(false)
  
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const [validEmail,setValidEamil] = useState(true)
  const [validPass,setValidPass] = useState(true)

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
      toast({
        title: 'login successfully',
        position:'top',
        status:'success',
        isClosable:true
      })
      route.push("/portal")
    }
    else{
      toast({
        title: 'login failed',
        position:'top',
        status:'error',
        isClosable:true
      })
      setValidEamil(false)
      setValidPass(false)
      setShowMssg(true)
      resetState()
    }
  }

  const resetState = () => {
    setEmail('')
    setPassword('')
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
            borderColor={validEmail?'gray.400':'red.400'}
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
              borderColor={validPass?'gray.400':'red.400'}
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
          <p 
            style={{display:showMssg?'block':'none',color:'red'}}
          >
              Invalid Email and Password!!
          </p>
          
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