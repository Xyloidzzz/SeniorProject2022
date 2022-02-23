import { Box, Button, Container, Flex, Heading, Stack } from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo'
import ClassBlock from '@/components/ClassBlock'
import SideBar from '@/components/SideBar'
import styles from '@/styles/Classrooms.module.css'

const classList = () => {
  return (
    <Container m='0' p='0'>
      <HeadInfo
        title='Classrooms'
        keyword='classrooms'
        description='classroom list'
      />
      <Flex w='100%'>
        <SideBar />
        {/* <Box>
          <Heading fontSize='xl'>Classrooms</Heading>
          <Button>Edit</Button>
          <Button>Add Class</Button>
        </Box> */}
        <Flex
          pos='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
        >
          {/* TODO: Fix this box. Padding and Margins are wack. */}
          <Box className={styles.main}>
            <Stack>
              <ClassBlock
                title='Classroom 1'
                description='This is a classroom description.'
                link='/classroom'
              ></ClassBlock>
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}

export default classList
