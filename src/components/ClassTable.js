import GradeTable from '@/components/GradeTable'
import {
  Box,
  Heading,
  Link,
  Button,
  Divider,
  Spacer,
  Flex,
  Table,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Group,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'

// TODO: FIX EVERYTHING HERE ONCE TABLE POPULATED

// TODO: Add weights to DB so we can have percentages and call them in GradesTable

const ClassTable = ({ classData, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  /*const [Ival, setIval] = React.useState('')
  const handleChange = (event) => setIval(event.target.Ival)
  const num = Ival;*/

  // const Ival = {
  //   rows: 0 ,
  //   col: 0 ,
  // };

  // const [values, setValues] = useState(Ival);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setValues({
  //     ...values,
  //     [name]: value,
  //   });
  // };

  // const rnum = values.rows;
  // const cnum = values.col;
  //const Assignment = [];
  const [assName, setAssName] = useState('')
  const [assDesc, setAssDesc] = useState('')
  // TODO: FIGURE OUT HOW TO DO A CUSTOM DATE & TIME PICKER
  const [assDue, setAssDue] = useState(
    moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  ) // convert ISOString at end
  // TODO: attachments eventually when we have file upload

  const [assType, setAssType] = useState('')
  const [assWeight, setAssWeight] = useState('')
  const [assIsHidden, setAssIsHidden] = useState(true)

  const [newAssType, setNewAssType] = useState('')
  const [newAssWeight, setNewAssWeight] = useState('')
  const [wantNewType, setWantNewType] = useState(false)

  const toast = useToast()

  // FIX ME: HANDLE SUBMIT NOT WORKING????
  const handleSubmit = async (e) => {
    // get gradeWeight.weight from classData based on assType
    const type = classData.gradeWeight.find((val) => val.type === assType)
    setAssWeight(type.weight)

    // send form to DB NEW ASSIGNMENT
    const res = await fetch(
      '/api/class/' + classData.id + '/createAssignment',
      {
        method: 'POST',
        body: JSON.stringify({
          title: assName,
          description: assDesc,
          dueDate: assDue,
          attachments: [],
          type: assType,
          weight: assWeight,
          isHidden: assIsHidden,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await res.json()
    // check data response status code
    const serverStatus = data.serverStat
    if (serverStatus == 200) {
      toast({
        title: 'Assignment Created',
        position: 'top',
        status: 'success',
        isClosable: true,
        duration: 2000,
      })
      resetState()
      e.preventDefault()
    } else {
      toast({
        title: 'Failed to Connect to Database',
        position: 'top',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    }
    onClose()
  }

  const resetState = () => {
    setAssName('')
    setAssDesc('')
    setAssDue(moment().endOf('day').fromNow())
    setAssIsHidden(false)
    setAssType('')
    setAssWeight('')
  }

  const saveNewType = async () => {
    // send newAssType and newAssWeight to DB

    // reset newAssType and newAssWeight
    setNewAssType('')
    setNewAssWeight('')
    setWantNewType(false)
  }

  const newType = () => {
    return (
      <>
        <FormLabel>New Assignment Type</FormLabel>
        <InputGroup>
          <Input
            name='assignment type'
            placeholder='Type (Exam, Homework, Quiz, etc)'
            value={newAssType}
            onChange={(e) => setNewAssType(e.target.value)}
          />
          <Input
            name='assignment weight'
            placeholder='Weight (0-1)'
            value={newAssWeight}
            onChange={(e) => setNewAssWeight(e.target.value)}
          />
          <InputRightElement>
            <Button
              h='1.75rem'
              w='1.25rem'
              size='sm'
              variantColor='blue'
              onClick={() => {
                saveNewType()
              }}
            >
              Save
            </Button>
          </InputRightElement>
        </InputGroup>
      </>
    )
  }

  return (
    <Flex
      width='full'
      height='full'
      p='5'
      shadow='lg'
      borderWidth='2px'
      borderColor='gray.200'
      flexDir='column'
      {...rest}
    >
      <Flex width='full' height='full' flex='1' flexDir='column' p='8'>
        <Box width='full' height='full' flex='1'>
          <Heading fontSize='xl'>Grades</Heading>
        </Box>
        <Spacer />
        <Box width='full' height='full' flex='1'>
          <Button onClick={onOpen}>Add Assignment</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Assignment</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name='assignment name'
                    placeholder='Name'
                    value={assName}
                    onChange={(e) => setAssName(e.target.value)}
                  />
                  <FormLabel>Description</FormLabel>
                  <Input
                    name='assignment desc'
                    placeholder='Description'
                    value={assDesc}
                    onChange={(e) => setAssDesc(e.target.value)}
                  />
                  {/* <FormLabel>Due Date</FormLabel>
                  <DateTimePicker
                    onChange={(e) => setAssDue(e.target.value)}
                    value={assDue}
                  /> */}
                  <FormLabel>Type</FormLabel>
                  <HStack>
                    {/* <Input
                      name='assignment type'
                      placeholder='Type (Exam, Homework, Quiz, etc)'
                      value={assType}
                      onChange={(e) => setAssType(e.target.value)}
                    /> */}
                    <Box width='full'>
                      <Select
                        value={assType}
                        onChange={(e) => setAssType(e.target.value)}
                      >
                        <option value=''>Select</option>
                        {classData.gradeWeight.map((type) => (
                          <option key={type.type} value={type.type}>
                            {type.type}
                          </option>
                        ))}
                      </Select>
                    </Box>
                    <Box>
                      <Button
                        h='1.75rem'
                        size='sm'
                        onClick={(e) =>
                          wantNewType
                            ? setWantNewType(false)
                            : setWantNewType(true)
                        }
                      >
                        {wantNewType ? '-' : '+'}
                      </Button>
                    </Box>
                  </HStack>
                  {wantNewType ? newType() : null}
                  <FormLabel>Public</FormLabel>
                  <RadioGroup value={assIsHidden} onChange={setAssIsHidden}>
                    <Stack spacing={5} direction='row'>
                      <Radio value={false}>Public</Radio>
                      <Radio value={true}>Hidden</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  type='submit'
                  colorScheme='blue'
                  mr={3}
                  onClick={handleSubmit}
                  value='Sumbit'
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
      <Spacer />
      <Box
        maxWidth='full'
        maxHeight='680px'
        flex='16'
        overflowY='auto'
        overflowX='auto'
      >
        <GradeTable classData={classData}></GradeTable>
      </Box>
    </Flex>
  )
}

export default ClassTable
