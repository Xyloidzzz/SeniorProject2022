import { Box, Divider, Flex, Heading, Spacer, VStack } from '@chakra-ui/react'
import ClassTable from '@/components/ClassTable'

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
