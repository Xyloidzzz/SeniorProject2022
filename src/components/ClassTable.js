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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import React, { useState } from "react";
import ReactDOM from 'react-dom';



const ClassTable = ({ ...rest }) => {
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
  const Atype = [];
  const [assing, setAssing] = useState('');
  const [astype, setAstype] = useState('');

  const handleSubmit = (event) => {
    resetState();
    event.preventDefault();
  }

 

  const resetState = () => {
    setAssing('');
    setAstype('');
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
        <Box width='full' height='full' flex='1' >
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
                  <FormLabel>Name of the Assignment</FormLabel>
                  <Input name='Assignments' placeholder='Name' value={assing} onChange={(e) => setAssing(e.target.value)}/>
                  <FormLabel>Type of Assignment</FormLabel>
                  <Input name='Type' placeholder='Type (Exam, Homework, etc)' value={astype} onChange={(e) => setAstype(e.target.value)}/>
                  <FormHelperText>Now numbers are saved!</FormHelperText>
                </FormControl>
              </ModalBody>
 
              <ModalFooter>
                <Button type='submit' colorScheme='blue' mr={3} onClick={onClose} value='Sumbit' onSubmit={handleSubmit}>
                  Submit
                </Button>
                
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
      <Spacer />
      <Box maxWidth='full' maxHeight='680px' flex='16' overflowY='auto' overflowX='auto'>
        <GradeTable tarea={assing} tipo={astype}></GradeTable>
      </Box>
    </Flex>
  )
}



export default ClassTable
