import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Stack,
} from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo'
import ClassroomListMain from '@/components/ClassroomListMain'
import SideBar from '@/components/SideBar'
import styles from '@/styles/Classrooms.module.css'

const ClassList = () => {
  return (
    <Flex width='full' m='0' p='0'>
      <HeadInfo
        title='Classrooms'
        keyword='classrooms'
        description='classroom list'
      />
      <Flex width='full' flexDir='row'>
        <Box width='full' flex='1'>
          <SideBar />
        </Box>
        {/* <Box>
          <Heading fontSize='xl'>Classrooms</Heading>
          <Button>Edit</Button>
          <Button>Add Class</Button>
        </Box> */}
        {/* TODO: Fix this box. Padding and Margins are wack. */}
        <Box width='full' flex='8'>
          <ClassroomListMain />
        </Box>
      </Flex>
    </Flex>
  )
}

export default ClassList
