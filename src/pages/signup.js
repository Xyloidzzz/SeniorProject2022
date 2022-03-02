import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from '@chakra-ui/react'
import { useState } from 'react'
import HeadInfo from '@/components/HeadInfo'
import styles from '@/styles/Home.module.css'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const submitUser = async (e) => {
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    console.log(data)
    resetState()
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
            borderColor='gray.400'
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
            borderColor='gray.400'
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
            borderColor='gray.400'
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
            borderColor='gray.400'
            _hover={{ borderColor: 'gray.600' }}
            focusBorderColor='black'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
