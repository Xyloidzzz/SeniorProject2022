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

const ClassList = ({data,classes}) => {
  const name = data.firstName+' '+data.lastName
  console.log(classes.length)
  classes.map(val=>{
    console.log(val.name)
    console.log(val.description)
  })
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
        
        <ClassroomListMain classLists={classes}/>
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
    const classlists = await fetch('http://localhost:3000/api/user/'+email+'/getClassLists')
    const classListsInfo = await classlists.json()
    console.log(data) //prints out json user's first name and last name
    // console.log(classListsInfo)
    return {
      props:{
        data,
        classes: classListsInfo
      }
    }
  }
}