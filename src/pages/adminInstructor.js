import {
    Box,
    Container,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
    useToast,
    Select,
    IconButton
  } from '@chakra-ui/react'
  import { BiArrowBack } from 'react-icons/bi'
  import { useState } from 'react'
  import HeadInfo from '@/components/HeadInfo'
  import styles from '@/styles/Home.module.css'
  import { useRouter } from 'next/router'

const adminStudent = () => {
    const router = useRouter()
    const toast = useToast()

    const [show1,setShow1]=useState(false)
    const [show2,setShow2]=useState(false)
    
    const [id, setID] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [prefix, setPrefix] = useState('')
    const [officeHours, setOffHours] = useState('')
  
    const [invalidEmail,setInvalidEmail]=useState(true)
    const [invalidPass,setInvalidPass]=useState(true)
    const [invalidFname,setInvalidFname]=useState(true)
    const [invalidLname,setInvalidLname]=useState(true)

    const role = "INSTRUCTOR"
  
  
    const submitUser = async (e) => {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ id, email, password, firstName, lastName, prefix, role, officeHours }),
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
        <Container centerContent='true'>
          <HeadInfo
            title='admin page'
            keyword='register student'
            description='enter information for student'
            icon='/grade_icon.ico'
          />
          <IconButton
          background='none'
          mt={5}
          _hover={{ background: 'none' }}
          icon={<BiArrowBack />}
          onClick={() => {
            router.back()
          }}
        />
          <Heading as='h4' size='3xl' padding='32px'>
            New Educator
          </Heading>
          <Box width='200px'>
            <FormControl isRequired>
            <FormLabel htmlFor='firstName'>ID</FormLabel>
              <Input
                id='ID'
                type='number'
                size='sm'
                variant='outline'
                // borderColor={invalidFname?'gray.400':'red.400'}
                // _hover={{
                //   borderColor: 'gray.600',
                // }}
                focusBorderColor='black'
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
              <FormLabel htmlFor='firstName'>First Name</FormLabel>
              <Input
                id='firstname'
                type='text'
                size='sm'
                variant='outline'
                // borderColor={invalidFname?'gray.400':'red.400'}
                // _hover={{
                //   borderColor: 'gray.600',
                // }}
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
                // borderColor={invalidLname?'gray.400':'red.400'}
                // _hover={{
                //   borderColor: 'gray.600',
                // }}
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
                // borderColor={invalidEmail?'gray.400':'red.400'}
                // _hover={{
                //   borderColor: 'gray.600',
                // }}
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
                //borderColor={invalidPass?'gray.400':'red.400'}
                //_hover={{ borderColor: 'gray.600' }}
                focusBorderColor='black'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormLabel htmlFor='password'>Prefix</FormLabel>
              <Select placeholder='Select option' onChange={(e)=>setPrefix(e.target.value)}>
                <option value='Mr.'>Mr.</option>
                <option value='Ms.'>Ms.</option>
                <option value='Mrs.'>Mrs.</option>
                <option value='Miss'>Miss</option>
              </Select>
              <FormLabel htmlFor='text'>Office Hours</FormLabel>
              <Input
                id='password'
                type='text'
                pr='4.5rem'
                size='sm'
                variant='outline'
                //borderColor={invalidPass?'gray.400':'red.400'}
                //_hover={{ borderColor: 'gray.600' }}
                focusBorderColor='black'
                value={officeHours}
                onChange={(e) => setOffHours(e.target.value)}
              />
              <Button
                mt={4}
                colorScheme='blue'
                type='submit'
                size="lg"
                onClick={submitUser}
                //disabled={isSubmitted}
              >
                Add
              </Button>
            </FormControl>
          </Box>
        </Container>
      )
}

export default adminStudent