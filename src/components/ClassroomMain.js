import { Box, Divider, Flex, Heading, Spacer, VStack } from '@chakra-ui/react'
import ClassTable from '@/components/ClassTable'

// TODO: if we ever make Notes a thing this is where they would show? along with the sidebar

const ClassroomMain = ({ userData, title, classData, where }) => {
  const display = () => {
    if (where === 'announcements') {
      return <Heading width='full'> PLACEHOLDER </Heading>
    }
    if (where === 'gradebook' && !userData.isStudent) {
      return <ClassTable classData={classData} />
    }
    if (where === 'assignments') {
      // TODO: PASS isStudent to this component
      return <Heading width='full'> PLACEHOLDER </Heading>
    }
    if (where) {
      return (
        <Heading width='full' textColor='red'>
          NO ACCESS
        </Heading>
      )
    }
  }

  return (
    <Flex width='full' height='full' p='8' mx='auto'>
      <Box flex='1' width='full'>
        <VStack width='full'>
          <Heading width='full'>{title}</Heading>
          <Divider />
          <Spacer />
          {display()}
        </VStack>
      </Box>
    </Flex>
  )
}

export default ClassroomMain
