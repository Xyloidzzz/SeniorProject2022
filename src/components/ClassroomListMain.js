import {
  Box,
  Divider,
  Flex,
  Heading,
  Spacer,
  VStack,
  Button,
} from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'
import ClassBlock from '@/components/ClassBlock'

const ClassroomListMain = () => {
  return (
    <Flex width='full' height='full' p='8' mx='auto'>
      <Box flex='1' width='full'>
        <VStack width='full' spacing='15px' align='left'>
          <Heading width='full'>Classrooms</Heading>
          <Divider />
          <Spacer />
          <ClassBlock
            title='Classroom 1'
            description="This is a classroom description. It can be a bit long. However, that's ok because we can simply truncate this."
            link='/classroom'
          />
          <Spacer />
          {/* TODO: FIX THIS DAMN BUTTON STRETCH????? LEFT ALIGN PLEASE FUTURE ME */}
          <Button mt={4} colorScheme='blue'>
            Add Class +
          </Button>
        </VStack>
      </Box>
    </Flex>
  )
}

export default ClassroomListMain
