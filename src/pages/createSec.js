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
    
    const [secName, setSecName] = useState('')
    const [secNum, setSecNum] = useState('')
    const [schedule, setSchedule] = useState('')
    const [year, setYear] = useState('')
    const [term, setTerm] = useState('')
    const [isOnline, setIsOn] = useState('')
    const [Synchronous, setSynchronous] = useState('')
    const [clsID, setClsID] = useState('')
  
    const [invalidEmail,setInvalidEmail]=useState(true)
    const [invalidPass,setInvalidPass]=useState(true)
    const [invalidFname,setInvalidFname]=useState(true)
    const [invalidLname,setInvalidLname]=useState(true)

    const submitSec = async (e) => {
      console.log(clsID)
      const id = secNum+'-'+clsID+'-'+term+'-'+year
      const response = await fetch('/api/admin/createSec', {
        method: 'POST',
        body: JSON.stringify({ id, secName, secNum, schedule, year, term, isOnline,Synchronous, clsID }),
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
                            value={secName}
                            onChange={(e) => setSecName(e.target.value)}
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
                            value={secNum}
                            onChange={(e) => setSecNum(e.target.value)}
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
                          value={schedule}
                          onChange={(e) => setSchedule(e.target.value)}
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
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
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
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                        />

                        <FormLabel htmlFor='password' padding='10px'>Is Online</FormLabel>
                        <Select placeholder='Select option' onChange={(e)=>setIsOn(e.target.value)}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Select>

                        <FormLabel htmlFor='password' padding='10px'>Synchronous</FormLabel>
                        <Select placeholder='Select option' onChange={(e)=>setSynchronous(e.target.value)}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </Select>

                        <FormLabel htmlFor='password' padding='10px'>Class ID</FormLabel>
                        <Select placeholder='Select Class ID' onChange={(e)=>setClsID(e.target.value)}>
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
                onClick={submitSec}
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

