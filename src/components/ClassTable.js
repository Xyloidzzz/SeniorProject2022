import GradeTable from '@/components/GradeTable'
import {
  Box,
  Heading,
  Button,
  Spacer,
  Flex,
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
  Input,
  InputGroup,
  InputRightElement,
  Select,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import moment from 'moment'

// TODO: Be Able to Change/Update Weight for specific assignments.
// TODO: Update assignment grade weight here by /checkWeight

const ClassTable = ({ classData, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [assName, setAssName] = useState('')
  const [assDesc, setAssDesc] = useState('')
  // TODO: FIGURE OUT HOW TO DO A CUSTOM DATE & TIME PICKER
  const [assDue, setAssDue] = useState(
    moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  )
  // TODO: attachments eventually when we have file upload

  const [assType, setAssType] = useState('')
  const [assWeight, setAssWeight] = useState('')
  const [assIsHidden, setAssIsHidden] = useState(true)

  const [newAssType, setNewAssType] = useState('')
  const [newAssWeight, setNewAssWeight] = useState('')
  const [wantNewType, setWantNewType] = useState(false)

  const toast = useToast()

  const createAssignment = async () => {
    // send form to DB NEW ASSIGNMENT
    const res = await fetch(
      '/api/class/' + classData.sectionID + '/createAssignment',
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (assType === '') {
      toast({
        title: 'Please select an assignment type.',
        position: 'top',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    } else {
      createAssignment()
    }
  }

  const resetState = () => {
    setAssName('')
    setAssDesc('')
    setAssDue(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'))
    setAssIsHidden(false)
    setAssType('')
    setAssWeight('')
  }

  const resetNewType = () => {
    setNewAssType('')
    setNewAssWeight('')
    setWantNewType(false)
  }

  // TODO: THIS WHOLE THING
  const saveNewType = async () => {
    // check if newAssType already exists from classData.gradeWeight
    const newTypeExists = classData.gradeWeight.some((type) =>
      type.type === newAssType ? true : false
    )
    if (newTypeExists) {
      toast({
        title: 'This type already exists.',
        position: 'top',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
    } else {
      // maybe we just don't accept blank weights later
      if (newAssWeight === '') {
        setNewAssWeight('0')
      }
      // send newAssType and newAssWeight to DB
      const res = await fetch(
        '/api/class/' + classData.sectionID + '/createType',
        {
          method: 'POST',
          body: JSON.stringify({
            type: newAssType,
            weight: newAssWeight,
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
          title: 'New Type Created',
          position: 'top',
          status: 'success',
          isClosable: true,
          duration: 2000,
        })
        resetNewType()
      } else {
        toast({
          title: 'Failed to Connect to Database',
          position: 'top',
          status: 'error',
          isClosable: true,
          duration: 2000,
        })
      }
    }
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
            placeholder='Weight (%)'
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

  const setTypeAndWeight = (e) => {
    setAssType(e.target.value.split('!!%')[0])
    setAssWeight(e.target.value.split('!!%')[1])
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
                        onChange={(e) => setTypeAndWeight(e)}
                      >
                        <option value=''>Select</option>
                        {classData.gradeWeight.map((type) => (
                          <option
                            key={type.type}
                            value={type.type + '!!%' + type.weight}
                          >
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
