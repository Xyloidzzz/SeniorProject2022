import 
{
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Spacer,
    Stack,
  } from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo'
import SideBar from '@/components/SideBar'
import StudentList from '@/components/StudentList'


const StudentsList = () => {

return(
<Flex width='full' m='0' p='0'>
<HeadInfo
        title='Student List'
        keyword='Slist'
        description='student list'
      />
      <Flex width='full' flexDir='row'>
        <Box width='full' flex='1'>
          <SideBar />
        </Box>
        <Box width='full' flex='16'>
          <StudentList />
        </Box>
    </Flex>
</Flex>
)

}

export default StudentsList