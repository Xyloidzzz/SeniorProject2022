import {
  Container,
  Box,
  HStack,
  Link,
  Heading,
  Img,
  Center
} from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import HeadInfo from '@/components/HeadInfo'
import NextLink from 'next/link'

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
                
              {/* <IconButton
                          aria-label='Enter-Student'
                          icon={<ArrowForwardIcon/>}
                      />
                      <Button mt={4} colorScheme='blue'>
                        Student
                      </Button> */}
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
          {/* <NextLink href='/classlist' passHref>
            <Link style={{ textDecoration: 'none' }}>
              
              <IconButton
                aria-label='Enter-Eduacator'
                icon={<ArrowRightIcon/>}
              />
              {<Button mt={4} colorScheme='blue'>
                Educator
              </Button>
            </Link> 
          </NextLink>  */}
        </HStack>
      </Box>
    </Container>
  )
}
