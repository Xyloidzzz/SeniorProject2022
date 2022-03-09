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

export const getServerSideProps = withSession(
  async ({req,res}) => {
  const user = req.session.get("user")
  console.log(user.email)
  if(!user){
    return {
      redirect:{
        destination: '/',
        permanent:false
      }
    }
  }
  else{
    return{
      redirect:{
        destination:'/portal',
        permanet:false
      }
    }
  }
})