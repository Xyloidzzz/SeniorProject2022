import { Box, Divider, Flex, Heading, Spacer, VStack } from '@chakra-ui/react'
import ClassBlock from '@/components/ClassBlock'

const ClassroomListMain = () => {
  return (
    <Flex width='full' height='full' p='8' mx='auto'>
      <Box flex='1' width='full'>
        <VStack width='full'>
          <Heading width='full'>Classrooms</Heading>
          <Divider />
          <Spacer />
          <ClassBlock
            title='Classroom 1'
            description="This is a classroom description. It can be a bit long. However, that's ok because we can simply truncate this."
            link='/classroom'
          ></ClassBlock>
        </VStack>
      </Box>
    </Flex>
  )
}

export default ClassroomListMain
