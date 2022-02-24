import { Flex, Box } from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo.js'
import SideBar from '@/components/SideBar'
import ClassroomMain from '@/components/ClassroomMain'

export default function classroom({ column, rows }) {
  return (
    <Flex width='full' m='0' p='0'>
      <HeadInfo title='Classroom' keyword='classroom' description='classroom' />
      <Box width='full' flex='1'>
        <SideBar />
      </Box>
      <Box width='full' flex='16'>
        <ClassroomMain title='Classroom 1' />
      </Box>
    </Flex>
  )
  classroom.defaultProps = {
    column: 0,
    rows: 0,
  }
}
