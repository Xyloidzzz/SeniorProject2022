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
} from '@chakra-ui/react'
import NextLink from 'next/link'

const ClassTable = ({ title, description, link, ...rest }) => {
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
          <Button>Edit Table?</Button>
        </Box>
      </Flex>
      <Spacer />
      <Box width='full' height='full' flex='16'>
        <GradeTable></GradeTable>
      </Box>
    </Flex>
  )
}

export default ClassTable
