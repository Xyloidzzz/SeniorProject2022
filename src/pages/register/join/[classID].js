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
  
  export default function SignUp({ClassID}) {
    const route = useRouter()
  
    const toast = useToast()
  
    const [show1,setShow1]=useState(false)
    const [show2,setShow2]=useState(false)
    
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
        body: JSON.stringify({ email, password, firstName, lastName, ClassID }),
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
          isClosable:true,
          duration: 2000
        })
        route.push("/")
        resetState()
      }
      else if(serverStatus == 404){
        toast({
          title: 'User already exist',
          position:'top',
          status:'error',
          isClosable:true,
          duration: 2000
        })
        setInvalidEmail(false)
        setShow1(true)
      }
      else{
        toast({
          title: 'Register failed',
          position:'top',
          status:'error',
          isClosable:true,
          duration: 2000
        })
        setInvalidEmail(false)
        setInvalidPass(false)
        setInvalidFname(false)
        setInvalidLname(false)
        setShow2(true)
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
            <p style={{display:show1?'block':'none',color:'red'}}>User already exist</p>
            <p style={{display:show2?'block':'none',color:'red'}}>Please enter all required field</p>
            <p><a href='/'>Already have account? Sign In!</a></p>
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
  
export async function getServerSideProps({query}){
    const ClassID = query.classID
    return {
        props:{
            ClassID
        }
    }
}