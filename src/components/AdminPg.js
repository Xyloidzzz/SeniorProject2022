import { Box, Divider, Flex, Heading, Spacer, VStack, Button, Input, FormLabel } from '@chakra-ui/react'

const adminPg = () =>{

return (
    <Flex width='full' height='full' p='8' mx='auto'>
      <Box flex='1' width='full'>
        <VStack width='full' spacing='15px' align='left'>
          <Heading width='full'> Admin Settings </Heading>
          <Divider />
          <Spacer/>

          <FormLabel>Add a new Student</FormLabel>
          <Button colorScheme='blue' size='lg'>Add</Button>

          <FormLabel>Add a new Professor</FormLabel>
          <Button colorScheme='blue' size='lg'>Add</Button>

          <FormLabel>Add a new Class</FormLabel>
          <Button colorScheme='blue' size='lg'>Add</Button>
          
          <Spacer/>
        </VStack>
      </Box>
    </Flex>
  )
}