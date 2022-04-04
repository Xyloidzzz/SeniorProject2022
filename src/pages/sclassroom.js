import { Flex, Box } from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo.js'
import StudentSBar from '@/components/SideBar'
import StudentClassroomMain from '@/components/ClassroomMain'
import { getSession } from 'next-auth/react'

export default function sclassroom({ column, rows }) {
  return (
    <Flex width='full' m='0' p='0'>
      <HeadInfo title='Classroom' keyword='classroom' description='classroom' />
      <Box width='full' flex='1'>
        <StudentSBar />
      </Box>
      <Box width='full' flex='16'>
        <StudentClassroomMain title= 'Class' />
      </Box>
    </Flex>
  )
  classroom.defaultProps = {
    column: 0,
    rows: 0,
  }
}

export async function getServerSideProps (context){
  
  const session = await getSession(context)
  if(session){
    return{
      redirect :{
        destination: '/classlist',
        permanent: false
      }
    }
  }
  return {
    props:{}
  }
  
}