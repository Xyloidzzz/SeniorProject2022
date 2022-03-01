import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react'

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
    <Container centerContent p='10'>
      <Box width='200px'>
        <FormControl isRequired>
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
