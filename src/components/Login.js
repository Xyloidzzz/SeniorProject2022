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
import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from "next-auth/react"


const Login = ({ width, height, padding }) => {

  const toast = useToast()

  const route = useRouter()

  const [showMssg,setShowMssg] = useState(false)
  
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [email,setEmail] = useState('')             //get email value
  const [password,setPassword] = useState('')       //get pw value

  const [validEmail,setValidEamil] = useState(true) //check for valid email
  const [validPass,setValidPass] = useState(true)   //check for valid pw

  //authentication
  const submitLogin = async(e) =>{
    const response = await signIn("credentials",{
      redirect: false,
      email: email,
      password: password
    })
    if(!response.error){
      //login success msg
      toast({
              title: 'login successfully',
              position: 'top',
              status: 'success',
              isClosable: true,
              duration: 2000
             })
      route.push('/classlist')
    }
    else{
      //pop up msg for failure
      toast({
              title: 'login failed',
              position: 'top',
              status: 'error',
              isClosable: true,
              duration: 2000
            })
      setValidEamil(false)
      setValidPass(false)
      setShowMssg(true)
      resetState()
    }
  } 
  //set email and pw input to empty string
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
              <IconButton
                aria-label='Login'
                icon={<ArrowForwardIcon />}
                mt={4}
                colorScheme='blue'
                onClick={submitLogin}
              >
                Login
              </IconButton>
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

