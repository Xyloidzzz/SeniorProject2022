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
import { getSession } from 'next-auth/react'

const ClassList = ({data}) => {
  const name = data.firstName+' '+data.lastName
  return (
    <Flex width='full' m='0' p='0'>
      <HeadInfo
        title='Classrooms'
        keyword='classrooms'
        description='classroom list'
      />
      <Flex width='full' flexDir='row'>
        <Box width='full' flex='1'>
          <SideBar userInfo={name} />
        </Box>
        <Box width='full' flex='16'>
          <ClassroomListMain />
        </Box>
      </Flex>
    </Flex>
  )
}

export default ClassList



export async function getServerSideProps(context){
  const session = await getSession(context)
  if(!session){
    return{
      redirect:{
        destination:'/',
        permanent: false
      }
    }
  }
  
  else{
    const email = session.user.email
    //fetch user's first name and last name from email
    const res = await fetch('http://localhost:3000/api/user/'+email);
    const data = await res.json()
    console.log(data) //prints out json user's first name and last name
    return {
      props:{
        data
      }
    }
  }
}