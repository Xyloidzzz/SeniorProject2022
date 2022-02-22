import { Container, Box, Heading } from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import HeadInfo from '@/components/HeadInfo'
import Login from '@/components/Login'

export default function Home() {
  return (
    <Container>
      <HeadInfo
        title='GradeBook'
        keyword='home'
        description='gradebook system'
        icon='/favicon.ico'
      />

      <Box className={styles.main}>
        <Heading as='h1' size='4xl' isTruncated>
          GradeBook
        </Heading>
        <Login width='200px' />
      </Box>
    </Container>
  )
}
