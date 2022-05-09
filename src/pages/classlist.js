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

const ClassList = ({ userData, classes }) => {
  // sort classes by fullName
  classes.classes.sort((a, b) => {
    if (a.fullName < b.fullName) {
      return -1
    }
    if (a.fullName > b.fullName) {
      return 1
    }
    return 0
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
          <SideBar
            userData={userData}
            inClass={false}
            classData={classes.classes}
          />
        </Box>
        <Box width='full' flex='16'>
          <ClassroomListMain classLists={classes} />
        </Box>
      </Flex>
    </Flex>
  )
}

export default ClassList

//this is for fetching the needed data from api (to get classes that were taken)
export async function getServerSideProps(context) {
  const session = await getSession(context)
  //check to see if user login
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } 
  else if(session.user.image=="ADMIN"){
    return {
      redirect: {
        destination: '/AdminPg',
        permanent: false
      }
    }
  }
  else {
    const email = session.user.email
    console.log(session)
    const classlists = await fetch(
      'http://localhost:3000/api/user/' + email + '/getClassLists'
    )
    const classListsInfo = await classlists.json()
    //console.log(classListsInfo)
    const userRes = await fetch('http://localhost:3000/api/user/' + email)
    const user = await userRes.json()
    return {
      props: {
        userData: user,
        classes: classListsInfo,
      },
    }
  }
}
