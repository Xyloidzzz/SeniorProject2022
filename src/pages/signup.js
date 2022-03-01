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

async function saveUser(user) {
  const response = await fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const changeEmail = (event) => {
    setEmail(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
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
            id='email'
            type='email'
            size='sm'
            variant='outline'
            borderColor='gray.400'
            _hover={{
              borderColor: 'gray.600',
            }}
            focusBorderColor='black'
            //value={email}
            //onChange={changeEmail}
          />
          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
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
            //value={email}
            //onChange={changeEmail}
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
            onChange={changeEmail}
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
            onChange={changePassword}
          />
          <Button
            mt={4}
            colorScheme='blue'
            type='submit'
            onSubmit={async (e) => {
              try {
                await saveUser({
                  email: email,
                  password: password,
                  firstName: 'test',
                  lastName: 'tester',
                  avatar: 'picture link',
                })
              } catch (err) {
                console.log(err)
              }
            }}
          >
            Sign Up
          </Button>
        </FormControl>
      </Box>
    </Container>
  )
}
