import { Container, Box, Heading } from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import HeadInfo from '@/components/HeadInfo'
import Login from '@/components/Login'
import withSession from 'lib/session'

export default function Home() {
  return (
    <Container className={styles.main}>
      <HeadInfo
        title='GradeBook'
        keyword='home'
        description='gradebook system'
        icon='/grade_icon.ico'
      />

      <Box>
        <Heading as='h1' size='4xl'>
          GradeBook
        </Heading>
        <Login width='200px' padding='10' />
      </Box>
    </Container>
  )
}
