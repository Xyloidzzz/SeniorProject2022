import { Box, Divider, Flex, Heading, Spacer, VStack } from '@chakra-ui/react'
import ClassTable from '@/components/ClassTable'

// TODO: change ClassTable to maybe a new Student Grades Component ifStudent
// in a similar vain SideBar should also change for a student

const ClassroomMain = ({ title, classData }) => {
  return (
    <Flex width='full' height='full' p='8' mx='auto'>
      <Box flex='1' width='full'>
        <VStack width='full'>
          <Heading width='full'>{title}</Heading>
          <Divider />
          <Spacer />
          <ClassTable classData={classData} />
        </VStack>
      </Box>
    </Flex>
  )
}

export default ClassroomMain
