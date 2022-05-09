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
    IconButton,
    HStack
  } from '@chakra-ui/react'
  import { BiArrowBack } from 'react-icons/bi'
  import { useState } from 'react'
  import HeadInfo from '@/components/HeadInfo'
  import styles from '@/styles/Home.module.css'
  import { useRouter } from 'next/router'

export default function createSec({classes}) {
    console.log(classes)
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
    const [clsID, setclsID] = useState('')
  
    const [invalidEmail,setInvalidEmail]=useState(true)
    const [invalidPass,setInvalidPass]=useState(true)
    const [invalidFname,setInvalidFname]=useState(true)
    const [invalidLname,setInvalidLname]=useState(true)

    const submitUser = async (e) => {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({ email, password, firstName, lastName, prefix, role, officeHours }),
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
        <Container maxW='10000px'centerContent='true' >
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
            New Class
          </Heading>
          <Box width='1500px'>
            
            <FormControl isRequired>
            
                <HStack>
                    <FormLabel htmlFor='firstName' padding='10px'>Section ID</FormLabel>
                        <Input
                            id='section ID'
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
                        <FormLabel htmlFor='firstName' padding='10px'>Section Name</FormLabel>
                        <Input
                            id='section name'
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
                       
                </HStack>
                <HStack>
                        <FormLabel htmlFor='lastName' padding='10px'>Section Number</FormLabel>
                        <Input
                            id='section number'
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
                        
                        <FormLabel htmlFor='text' padding='10px'>Schedule</FormLabel>
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
                </HStack>

                <HStack>
                        <FormLabel htmlFor='password' padding='10px'>Year</FormLabel>
                        <Input
                            id='year'
                            type='number'
                            pr='4.5rem'
                            size='sm'
                            variant='outline'
                            //borderColor={invalidPass?'gray.400':'red.400'}
                            //_hover={{ borderColor: 'gray.600' }}
                            focusBorderColor='black'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormLabel htmlFor='email' padding='10px'>Term</FormLabel>
                        <Input
                            id='Term'
                            type='text'
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

                        <FormLabel htmlFor='password' padding='10px'>Is Online</FormLabel>
                        <Select placeholder='Select option' onChange={(e)=>setPrefix(e.target.value)}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Select>

                        <FormLabel htmlFor='password' padding='10px'>Synchronous</FormLabel>
                        <Select placeholder='Select option' onChange={(e)=>setPrefix(e.target.value)}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Select>

                        <FormLabel htmlFor='password' padding='10px'>Class ID</FormLabel>
                        <Select placeholder='Select Class ID' onChange={(e)=>setclsID(e.target.value)}>
                            {classes.data.map((item) => {
                                return(
                                    <option key = { item.classNum} value={item.id}>{item.id}</option>
                                )
                            })}
                            
                        </Select>
              </HStack>

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

export async function getServerSideProps(){
    const res = await fetch ('http://localhost:3000/api/admin/getClasses')
    const classes = await res.json()
    return{
        props:{
            classes : classes
        }
    }
}

