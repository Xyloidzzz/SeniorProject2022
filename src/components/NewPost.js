import {
  Box,
  Button,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import rehypeSanitize from 'rehype-sanitize'

// TODO: warnings for saving to the server maybe auto save as a draft hidden?

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)
const EditerMarkdown = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown
    }),
  { ssr: false }
)
const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  { ssr: false }
)

const NewPost = ({ userData, classData, ...rest }) => {
  const [value, setValue] = useState(
    '# Test Post\n\nThis is a test *markdown* post.\n\nIt uses states to provide us with the shit below.'
  )

  const [title, setTitle] = useState(value.split('\n')[0])
  const [body, setBody] = useState(value.split('\n').slice(1).join('\n'))
  const [isHidden, setIsHidden] = useState(true)
  // TODO: attachements when we have file uploads

  const toast = useToast()
  const router = useRouter()

  const savePost = async () => {
    // save to db
    const res = await fetch(
      '/api/class/' + classData.sectionID + '/createPost',
      {
        method: 'POST',
        body: JSON.stringify({ title, body, isHidden }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await res.json()
    if (data.serverStatus == 200) {
      // redirect to announcements
      router.push('/classroom/' + classData.sectionID)
    } else {
      toast({
        title: 'Failed to Connect to Database',
        position: 'top',
        status: 'error',
        isClosable: true,
        duration: 2000,
      })
      setTitle('')
      setBody('')
    }
  }

  const onChangeListener = (val, count) => {
    setValue(val)
    setTitle(val.split('\n')[0])
    setBody(val.split('\n').slice(1).join('\n'))
  }

  return (
    <Flex
      width='full'
      p='5'
      shadow='lg'
      borderWidth='2px'
      borderColor='gray.200'
      flexDir='row'
      {...rest}
    >
      <Box width='full' height='full' flex='5' data-color-mode='light'>
        <MDEditor
          value={value}
          onChange={(e) => onChangeListener(e, 1)}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
        <Spacer />
        <HStack mt={4} width='full'>
          <RadioGroup value={isHidden} onChange={setIsHidden}>
            <Stack spacing={5} direction='row'>
              <Radio value={false}>Public</Radio>
              <Radio value={true}>Hidden</Radio>
            </Stack>
          </RadioGroup>
          <Button
            alignSelf='right'
            colorScheme='blue'
            onClick={savePost}
            style={{ display: userData.isStudent ? 'none' : 'block' }}
          >
            Save Post
          </Button>
        </HStack>
      </Box>
    </Flex>
  )
}

export default NewPost
