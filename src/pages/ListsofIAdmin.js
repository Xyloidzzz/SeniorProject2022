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



export default function insClassCreate({instructors}){

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
            <Heading padding='30px'>Instructor Lists</Heading>
            <hr></hr>
            <Spacer></Spacer>
            <Table variant='unstyled'>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>First Name</Th>
                        <Th>Last Name</Th>
                        <Th>Email</Th>
                        <Th>Add Class</Th>
                    </Tr>
                </Thead>
                   
                <Tbody>
                    { instructors.data.map((val) => {
                        return(
                            <Tr key={val.id}>
                                <Td>{val.id}</Td>
                                <Td>{val.firstName}</Td>
                                <Td>{val.lastName}</Td>
                                <Td>{val.email}</Td>
                                <Td>
                                    <NextLink href={val.id+'/addClsInst'}>
                                        <Link >
                                            <IconButton
                                            aria-label='Enter Class'
                                            size='sm'
                                            icon={<ArrowForwardIcon />}
                                            mt={4}
                                            colorScheme='blue'
                                            >
                                            Enter
                                            </IconButton>
                                        </Link>
                                    </NextLink> 
                                    
                                </Td>
                            </Tr>
                        ) 
                    })}
                </Tbody>
        </Table>
        </Container>
       
        
    )
}


export async function getServerSideProps(){
    const res = await fetch ('http://localhost:3000/api/admin/getIns')
    const instructors = await res.json()
    
    console.log(instructors)
    return {
        props:{
            instructors: instructors
        }
    }
}