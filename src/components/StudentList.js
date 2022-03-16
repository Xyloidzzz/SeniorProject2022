import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    VStack,
    Flex,
    Heading,
    Box,
    Divider,
    Spacer,
    Stack,
    Checkbox,
  } from '@chakra-ui/react'



const StudentList = () => {
const SL = ['Alfredo Pena', 'Jesus Mendez', 'Jaehun Kim', 'John Doe', 'Diego Rivera', 'Peter Parker', 'Nathan Drake', 'Arthur Morgan'];
const CBoxes = [];
const TSL = [];

for(let j = 0; j<SL.length; j++){
    CBoxes[j] = <Checkbox size='lg' colorScheme='green'></Checkbox>
}

for(let i = 0; i<SL.length; i++){
    TSL[i] = <Tr><Td>{SL[i]}</Td><Stack spacing={[5]} direction={['column']}>{CBoxes[i]}</Stack></Tr>;
    
}


return(
 
<Flex  width='full' height='full' p='8' mx='auto'>
    <Box  flex='1' width='full'>
        <VStack width='full' spacing='15px' align='left'>
            <Heading width='full'>Student List</Heading>
            <Divider />
            <Spacer />
            <Table variant='unstyled'>
                <Thead>
                    <Tr>
                        <Th>Student List</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {TSL}
                </Tbody>
            </Table>

        </VStack>
    </Box>
</Flex>


)

}


export default StudentList
