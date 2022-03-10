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



const ClassTable = ({ ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  
  /*const [Ival, setIval] = React.useState('')
  const handleChange = (event) => setIval(event.target.Ival)
  const num = Ival;*/
  
  const Ival = {
    rows: 0 ,
    col: 0 ,
  };


  const [values, setValues] = useState(Ival);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const rnum = values.rows;
  const cnum = values.col;

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
          <Button onClick={onOpen}>Edit Table</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Table</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Number of Students (Rows)</FormLabel>
                  <Input name='rows' placeholder='# of Rows' value={values.rows} onChange={handleInputChange} />
                  <FormLabel>Number of Assignments (Columns)</FormLabel>
                  <Input name='col' placeholder='# of Columns' value={values.col} onChange={handleInputChange} />
                  <FormHelperText>Now numbers are saved!</FormHelperText>
                </FormControl>
              </ModalBody>
 
              <ModalFooter>
                <Button type='submit' colorScheme='blue' mr={3} onClick={onClose} /*onSubmit={onSubmitListener}*/>
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Flex>
      <Spacer />
      <Box maxWidth='full' maxHeight='680px' flex='16' overflowY='auto' overflowX='auto'>
        <GradeTable rdata={rnum} cdata={cnum}></GradeTable>
      </Box>
    </Flex>
  )
}



export default ClassTable
