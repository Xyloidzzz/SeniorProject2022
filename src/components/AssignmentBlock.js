import { Flex, Box, Heading, Divider, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import rehypeSanitize from 'rehype-sanitize'
import NextLink from 'next/link'

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  {
    ssr: false,
  }
)

// TODO: add a edit button if not student in edit-post link don't let student see? or maybe just modal
// add edit button to full page post instead for ez editing for professor

const AssignmentBlock = ({
  key,
  assignmentID,
  title,
  description,
  isHidden,
  userData,
  classData,
  link,
  ...rest
}) => {
  const displaySideValue = () => {
    const assignment = classData.assignments.find(
      (assignment) => assignment.assignmentID === assignmentID
    )
    if (userData.isStudent) {
      // find grade based on assignmentID and userID
      const grade = assignment.grades.find(
        (grade) => grade.userID === userData.id
      )
      if (grade) {
        return grade.grade
      } else {
        return 'Not Graded'
      }
    } else {
      // calculate class average based on assignment id on classData
      if (assignment) {
        const average = assignment.grades.reduce((acc, grade) => parseFloat(acc) + parseFloat(grade.grade), 0) / assignment.grades.length
        return average.toFixed(2)
      } else {
        return 'N/A'
      }
    }
  }

  return (
    <Flex
      width='full'
      p='5'
      shadow='lg'
      borderWidth='2px'
      borderColor='gray.200'
      flexDir='row'
      display={isHidden && userData.isStudent ? 'none' : 'block'}
      {...rest}
    >
      <Box width='full' flex='5' data-color-mode='light'>
        <NextLink href={link} passHref>
          <Heading fontSize='xl' key={key} cursor='pointer'>
            <Markdown source={title} rehypePlugins={[[rehypeSanitize]]} />
          </Heading>
        </NextLink>
        <Divider orientation='horizontal' colorScheme='black' />
        <Text mt={4}>
          <Markdown source={description} rehypePlugins={[[rehypeSanitize]]} />
        </Text>
      </Box>
      <Box width='full' flex='1' align='right' display='block'>
        <Text fontWeight='bold' fontSize='sm'>
          {userData.isStudent ? 'Grade' : 'Class Average'}
        </Text>
        {displaySideValue()}
      </Box>
    </Flex>
  )
}

export default AssignmentBlock
