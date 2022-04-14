import { Container, Box, Heading, Button, Link } from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import HeadInfo from '@/components/HeadInfo'
import Login from '@/components/Login'
import { getSession } from 'next-auth/react'

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

//if user logged in, page will redirect to portal page
export async function getServerSideProps (context){
  
  const session = await getSession(context)
  console.log(session)
  if(session){
    return{
      redirect :{
        destination: '/classlist',
        permanent: false
      }
    }
  }
  return {
    props:{}
  }
  
}

