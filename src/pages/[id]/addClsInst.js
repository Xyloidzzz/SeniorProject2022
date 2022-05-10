import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Link,
  IconButton,
  Container,
  Heading,
  Spacer
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { BiArrowBack } from 'react-icons/bi'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import { useState } from 'react'


export default function addClsInst({sections,instID}){

  const submitSec = async (e, sectID) =>{
    const response = await fetch('/api/admin/instAddClass',{
      method: 'POST',
      body: JSON.stringify ({ instID, sectID }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    const serverStat = data.serverStat
    if(serverStat == 200){
      console.log('added')
    }
    else if ( serverStat == 404){
      console.log('already exists')
    }
    else{
      console.log(data)
    }
  }


  const router = useRouter()
  return(
      <Container maxW='container.sm' b>
          <IconButton
              background='none'
              mt={5}
              _hover={{ background: 'none' }}
              icon={<BiArrowBack />}
              onClick={() => {
                  router.back()
              }}
          />
          <Heading padding='30px'>Class Section Lists</Heading>
          <hr></hr>
          <Spacer></Spacer>
          <Table variant='unstyled'>
              <Thead>
                  <Tr>
                      <Th>ID</Th>
                      <Th>Course Name</Th>
                      <Th>Term</Th>
                      <Th>Year</Th>
                      <Th>Schedule</Th>
                      <Th>Online</Th>
                      <Th>Synchronous</Th>
                  </Tr>
              </Thead>
                 
              <Tbody>
                  { sections.data.map((val) => {
                      if(val.isOnline == true){
                        val.isOnline = 'Online'
                      }
                      else{
                        val.isOnline = 'Offline'
                      }
                      if(val.isSynchronous == true){
                        val.isSynchronous = 'Yes'
                      }
                      else{
                        val.isSynchronous = 'No'
                      }
                      return(
                          <Tr key={val.classID}>
                              <Td>{val.id}</Td>
                              <Td>{val.fullName}</Td>
                              <Td>{val.term}</Td>
                              <Td>{val.year}</Td>
                              <Td>{val.schedule}</Td>
                              <Td>{val.isOnline}</Td>
                              <Td>{val.isSynchronous}</Td>
                              <Td>
                                        <IconButton
                                          aria-label='Enter Class'
                                          size='sm'
                                          icon={<ArrowForwardIcon />}
                                          mt={4}
                                          colorScheme='blue'
                                          onClick={(e)=>submitSec(e, val.id)}
                                          >
                                          +
                                        </IconButton>
                              </Td>
                          </Tr>
                      ) 
                  })}
              </Tbody>
      </Table>
      </Container>
     
      
  )
}


export async function getServerSideProps(context){
  const res = await fetch ('http://localhost:3000/api/admin/getSections')
  const sections = await res.json()
  console.log(sections)
  return {
      props:{
          sections: sections,
          instID: context.params.id
      }
  }
}