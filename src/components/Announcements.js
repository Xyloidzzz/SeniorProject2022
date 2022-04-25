import {
  Flex,
  Box,
  Heading,
  Divider,
  Text,
  Button,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import rehypeSanitize from 'rehype-sanitize'
import { useRouter } from 'next/router'
import AnnouncementBlock from '@/components/AnnouncementBlock'

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
)

const Announcements = ({ userData, classData, ...rest }) => {
  const router = useRouter()
  const [value, setValue] = useState(
    '# Test Post\n\nThis is a test *markdown* post.\n\nIt uses states to provide us with the shit below.'
  )

  return (
    <VStack>
      {classData.posts.map((post) => {
        return (
          <AnnouncementBlock
            key={post.id}
            userData={userData}
            title={post.title}
            body={post.body}
            isHidden={post.isHidden}
            link={'/classroom/' + classData.sectionID + '/post/' + post.id}
          ></AnnouncementBlock>
        )
      })}
      <Spacer />
      <Button
        width='full'
        mt={4}
        colorScheme='blue'
        onClick={() => {
          router.push('/classroom/' + classData.sectionID + '/new-post')
        }}
        style={{ display: userData.isStudent ? 'none' : 'block' }}
      >
        + New Post
      </Button>
    </VStack>
  )
}

export default Announcements
