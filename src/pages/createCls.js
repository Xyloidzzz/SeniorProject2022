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

  export default function createCls(){
    const router = useRouter()
    const toast = useToast()

    const [show1,setShow1]=useState(false)
    const [show2,setShow2]=useState(false)
    
    const [id, setID] = useState('')
    const [clsTitle, setClsTitle] = useState('')
    const [clsDesc, setClsDesc] = useState('')
    const [clsDept, setClsDept] = useState('')
    const [clsNum, setClsNum] = useState('')
    const [creditH, setCreditH] = useState('')
  
    const [invalidEmail,setInvalidEmail]=useState(true)
    const [invalidPass,setInvalidPass]=useState(true)
    const [invalidFname,setInvalidFname]=useState(true)
    const [invalidLname,setInvalidLname]=useState(true)


    const submitCls = async (e) => {
        const response = await fetch('/api/admin/createCls', {
          method: 'POST',
          body: JSON.stringify({ id, clsTitle, clsDesc, clsDept, clsNum, creditH  }),
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
          console.log(serverStatus)
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

      return(
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
                        <FormLabel htmlFor='email' padding='10px'>ClassID</FormLabel>
                        <Input
                            id='class ID'
                            type='number'
                            size='sm'
                            variant='outline'
                            // borderColor={invalidEmail?'gray.400':'red.400'}
                            // _hover={{
                            //   borderColor: 'gray.600',
                            // }}
                            focusBorderColor='black'
                            value={id}
                            onChange={(e) => setID(e.target.value)}
                        />
                        <FormLabel htmlFor='email' padding='10px'>Class Title</FormLabel>
                        <Input
                            id='class Title'
                            type='text'
                            size='sm'
                            variant='outline'
                            // borderColor={invalidEmail?'gray.400':'red.400'}
                            // _hover={{
                            //   borderColor: 'gray.600',
                            // }}
                            focusBorderColor='black'
                            value={clsTitle}
                            onChange={(e) => setClsTitle(e.target.value)}
                        />
                        
              </HStack>
              <HStack>
                        <FormLabel htmlFor='email' padding='10px'>Class description</FormLabel>
                        <Input
                            id='class description'
                            type='text'
                            size='sm'
                            variant='outline'
                            // borderColor={invalidEmail?'gray.400':'red.400'}
                            // _hover={{
                            //   borderColor: 'gray.600',
                            // }}
                            focusBorderColor='black'
                            value={clsDesc}
                            onChange={(e) => setClsDesc(e.target.value)}
                        />
                        <FormLabel htmlFor='email' padding='10px'>Class department</FormLabel>
                        <Input
                            id='class department'
                            type='text'
                            size='sm'
                            variant='outline'
                            // borderColor={invalidEmail?'gray.400':'red.400'}
                            // _hover={{
                            //   borderColor: 'gray.600',
                            // }}
                            focusBorderColor='black'
                            value={clsDept}
                            onChange={(e) => setClsDept(e.target.value)}
                        />

              </HStack>
              <HStack>
                        <FormLabel htmlFor='email' padding='10px'>Class Number</FormLabel>
                        <Input
                            id='class number'
                            type='number'
                            size='sm'
                            variant='outline'
                            // borderColor={invalidEmail?'gray.400':'red.400'}
                            // _hover={{
                            //   borderColor: 'gray.600',
                            // }}
                            focusBorderColor='black'
                            value={clsNum}
                            onChange={(e) => setClsNum(e.target.value)}
                        />
                        <FormLabel htmlFor='email' padding='10px'>Credit Hours</FormLabel>
                        <Input
                            id='credit hours'
                            type='number'
                            size='sm'
                            variant='outline'
                            // borderColor={invalidEmail?'gray.400':'red.400'}
                            // _hover={{
                            //   borderColor: 'gray.600',
                            // }}
                            focusBorderColor='black'
                            value={creditH}
                            onChange={(e) => setCreditH(e.target.value)}
                        />
                </HStack>
                <Button
                mt={4}
                colorScheme='blue'
                type='submit'
                size="lg"
                onClick={submitCls}
                //disabled={isSubmitted}
              >
                Add
              </Button>
            </FormControl>
          </Box>
        </Container> 
      )
  }