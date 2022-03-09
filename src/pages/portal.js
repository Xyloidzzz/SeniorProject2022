import {
  Container,
  Box,
  HStack,
  Link,
  Heading,
  Img,
  Center,
  propNames
} from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import HeadInfo from '@/components/HeadInfo'
import NextLink from 'next/link'
import withSession from 'lib/session'


function Feature({title,imgUrl,url}){
  return (
    <NextLink href={'/'+url} passHref >
        <Link style={{ textDecoration: 'none' }} _hover={{backgroundColor: 'blue.100'}}>
          <Box
            w='500px'
            h='600px'
            p={5}
            shadow='md'
            borderWidth='1px'
            flex='1'
            borderRadius='md'
            alignItems='center'
          >
            <Center>
              <Heading fontSize='3xl'>{title}</Heading>
            </Center>
            <Img 
              boxSize='450px' 
              src={'/'+imgUrl}
              borderRadius='full' 
            >
            </Img>
          </Box>
        </Link>
      </NextLink> 
  )
}


export default function Portal() {
  return (
    // TODO: Add a setting that saves a default select through database
    <Container centerContent className={styles.main}>
      <HeadInfo title='Select a Portal' keyword='portal' />
      <Box>
        <HStack spacing={100} align='center'>
          <Feature title='Students' imgUrl='student_icon.ico' url='portal'></Feature>
          <Feature title='Educator' imgUrl='professor_icon.ico'url='classlist'></Feature>
        </HStack>
      </Box>
    </Container>
  )
}

//getting session info if session expires, return to login page
export const getServerSideProps = withSession(
  async ({req,res}) => {
  const user = req.session.get("user")
  console.log(user.email)
  //req.session.destroy()
  if(!user){
    return {
      redirect:{
        destination: '/',
        permanent:false
      }
    }
  }
  return {
    props:{
      data:user
    }
  }
})