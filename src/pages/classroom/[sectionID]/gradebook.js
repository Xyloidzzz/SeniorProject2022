import { Flex, Box } from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo.js'
import SideBar from '@/components/SideBar'
import ClassroomMain from '@/components/ClassroomMain'
import { getSession } from 'next-auth/react'

export default function classroom({ userData, classData }) {
  return (
    <Flex width='full' m='0' p='0'>
      <HeadInfo title='Classroom' keyword='classroom' description='classroom' />
      <Box width='full' flex='1'>
        <SideBar
          userData={userData}
          inClass={true}
          classData={classData}
          where='gradebook'
        />
      </Box>
      <Box width='full' flex='16'>
        <ClassroomMain
          userData={userData}
          title='Gradebook'
          classData={classData}
          where='gradebook'
        />
      </Box>
    </Flex>
  )
}

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
  } else {
    // grades
    const getGrades = await fetch(
      'http://localhost:3000/api/class/' +
        context.params.sectionID +
        '/getAllGrades'
    )
    const grades = await getGrades.json()
    // class
    const classRes = await fetch(
      'http://localhost:3000/api/class/' + context.params.sectionID
    )
    const classData = await classRes.json()
    classData.grades = grades

    const userRes = await fetch(
      'http://localhost:3000/api/user/' + session.user.email
    )
    const user = await userRes.json()

    return {
      props: {
        userData: user,
        classData,
      },
    }
  }
}
