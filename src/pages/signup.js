import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import HeadInfo from '@/components/HeadInfo'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

export default function SignUp() {
  const route = useRouter()

  const toast = useToast()

  const [show,setShow]=useState(false)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [invalidEmail,setInvalidEmail]=useState(true)
  const [invalidPass,setInvalidPass]=useState(true)
  const [invalidFname,setInvalidFname]=useState(true)
  const [invalidLname,setInvalidLname]=useState(true)


  const submitUser = async (e) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    const serverStatus = data.serverStat
    if(serverStatus==200){
      toast({
        title: 'register successfully',
        position:'top',
        status:'success',
        isClosable:true
      })
      route.push("/")
      resetState()
    }
    else{
      toast({
        title: 'register failed',
        position:'top',
        status:'error',
        isClosable:true
      })
      setInvalidEmail(false)
      setInvalidPass(false)
      setInvalidFname(false)
      setInvalidLname(false)
      setShow(true)
    }
      
  }

  const resetState = () => {
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }

  return (
    <Container className={styles.main}>
      <HeadInfo
        title='Welcome!'
        keyword='signup'
        description='enter information for sign up'
        icon='/grade_icon.ico'
      />
      <Heading as='h1' size='4xl' padding='32px'>
        GradeBook
      </Heading>
      <Box width='200px'>
        <FormControl isRequired>
          <FormLabel htmlFor='firstName'>First Name</FormLabel>
          <Input
            id='firstname'
            type='text'
            size='sm'
            variant='outline'
            borderColor={invalidFname?'gray.400':'red.400'}
            _hover={{
              borderColor: 'gray.600',
            }}
            focusBorderColor='black'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
          <Input
            id='lastname'
            type='text'
            size='sm'
            variant='outline'
            borderColor={invalidLname?'gray.400':'red.400'}
            _hover={{
              borderColor: 'gray.600',
            }}
            focusBorderColor='black'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input
            id='email'
            type='email'
            size='sm'
            variant='outline'
            borderColor={invalidEmail?'gray.400':'red.400'}
            _hover={{
              borderColor: 'gray.600',
            }}
            focusBorderColor='black'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormLabel htmlFor='password'>Password</FormLabel>
          <Input
            id='password'
            type='password'
            pr='4.5rem'
            size='sm'
            variant='outline'
            borderColor={invalidPass?'gray.400':'red.400'}
            _hover={{ borderColor: 'gray.600' }}
            focusBorderColor='black'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p style={{display:show?'block':'none',color:'red'}}>Please enter all required field</p>
          <Button
            mt={4}
            colorScheme='blue'
            type='submit'
            //disabled={isSubmitted}
            onClick={submitUser}
          >
            Sign Up
          </Button>
        </FormControl>
      </Box>
    </Container>
  )
}
