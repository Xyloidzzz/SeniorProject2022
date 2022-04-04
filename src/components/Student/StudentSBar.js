import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Link,
  Box,
  Spacer,
} from '@chakra-ui/react'
import {
  BiMenu,
  BiHome,
  BiListUl,
  BiBook,
  BiBookOpen,
  BiLogOut,
  BiCog,
} from 'react-icons/bi'
import StudentNavItem from '@/components/Student/StudentNavItem'
import { signOut } from 'next-auth/react'


export default function SSidebar({userInfo}) {
  const router = useRouter()
  const [navSize, changeNavSize] = useState('large')

  return (
    <Flex
      pos='sticky'
      h='100vh'
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
      borderRight='1px'
      borderColor='gray.200'
      w={navSize == 'small' ? '75px' : '200px'}
      flexDir='column'
      justifyContent='space-between'
      backgroundColor='gray.100'
    >
      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        as='nav'
      >
        <IconButton
          background='none'
          mt={5}
          _hover={{ background: 'none' }}
          icon={<BiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large')
            else changeNavSize('small')
          }}
        />
        <StudentNavItem
          navSize={navSize}
          icon={BiHome}
          title='Dashboard'
          link='#'
          active={router.pathname == '/dashboard' ? true : false}
        />
        <StudentNavItem
          navSize={navSize}
          icon={BiBook}
          title='Gradebook'
          link='/student/classes'
          active={
            router.pathname == '/sclasslist' || '/sclassroom' ? true : false
          }
        />
        <StudentNavItem navSize={navSize} icon={BiCog} title='Settings' link='#' />
      </Flex>

      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider display={navSize == 'small' ? 'none' : 'flex'} />
        <Flex
          width='full'
          align='center'
          flexDir={navSize == 'small' ? 'column' : 'row'}
        >
          <Avatar size='sm' src='avatar.png' />
          <Flex
            flexDir='column'
            ml={4}
            flex='1'
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Heading as='h3' size='sm'>
              {userInfo}
            </Heading>
            <Text color='gray'>Professor</Text>
          </Flex>
          <Spacer />
          <Box width='full' flex='1' align='center'>
                <IconButton aria-label='logout' size='lg' icon={<BiLogOut />} onClick={()=>signOut({callbackUrl:'/'})} >
                  Logout
                </IconButton>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
