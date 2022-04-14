import { Flex, Box } from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo.js'
import SideBar from '@/components/SideBar'
import ClassroomMain from '@/components/ClassroomMain'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// TODO: somewhere in loop we are missing student verification

// TODO: userData to sidebar for profile thingy

// TODO: Check if Student through one of the fetches so we don't do too many calls for one page

export default function classroom({ userData, classData }) {
  const userName = userData
  return (
    <Flex width='full' m='0' p='0'>
      <HeadInfo title='Classroom' keyword='classroom' description='classroom' />
      <Box width='full' flex='1'>
        <SideBar userInfo={userName} />
      </Box>{' '}
      <Box width='full' flex='16'>
        <ClassroomMain title='Class' classData={classData} />
      </Box>{' '}
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
        context.params.classID +
        '/getAllGrades'
    )
    const grades = await getGrades.json()
    // class
    const classRes = await fetch(
      'http://localhost:3000/api/class/' + context.params.classID
    )
    const classData = await classRes.json()
    classData.grades = grades
    
    return {
      props: {
        userData:session.user.name,
        classData,
      },
    }
  }
}
