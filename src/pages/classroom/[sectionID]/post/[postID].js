import {
  Flex,
  Box,
  VStack,
  Heading,
  Divider,
  Spacer,
  Text,
} from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo.js'
import SideBar from '@/components/SideBar'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import rehypeSanitize from 'rehype-sanitize'

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  {
    ssr: false,
  }
)

export default function FullPost({ userData, classData }) {
  const router = useRouter()
  const post = classData.posts.find(
    (post) => post.postID === router.query.postID
  )
  return (
    <Flex width='full' m='0' p='0'>
      <HeadInfo title='Classroom' keyword='classroom' description='classroom' />
      <Box width='full' flex='1'>
        <SideBar
          userData={userData}
          inClass={true}
          classData={classData}
          where='announcements'
        />
      </Box>
      <Box width='full' flex='16'>
        <Flex width='full' height='full' p='8' mx='auto'>
          <Box flex='1' width='full'>
            <VStack width='full' spacing='15px' align='left'>
              <Box width='full' data-color-mode='light'>
                <Heading fontSize='xl' key={post.postID}>
                  <Markdown
                    source={post.title}
                    rehypePlugins={[[rehypeSanitize]]}
                  />
                </Heading>
                <Divider orientation='horizontal' colorScheme='black' />
                <Text mt={4}>
                  <Markdown
                    source={post.body}
                    rehypePlugins={[[rehypeSanitize]]}
                  />
                </Text>
              </Box>
            </VStack>
          </Box>
        </Flex>
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
