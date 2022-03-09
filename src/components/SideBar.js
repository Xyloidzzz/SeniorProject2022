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
import NavItem from '@/components/NavItem'
import NextLink from 'next/link'


export default function Sidebar() {
  const router = useRouter()
  const [navSize, changeNavSize] = useState('large')

  return (
    <Flex
      pos='sticky'
      h='100vh'
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
      borderRight='1px'
      borderColor='gray.200'
      // borderRadius={navSize == 'small' ? '15px' : '30px'}
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
        <NavItem
          navSize={navSize}
          icon={BiHome}
          title='Dashboard'
          link='#'
          active={router.pathname == '/dashboard' ? true : false}
        />
        <NavItem
          navSize={navSize}
          icon={BiListUl}
          title='Students List'
          link='#'
          active={router.pathname == '/students' ? true : false}
        />
        <NavItem
          navSize={navSize}
          icon={BiBook}
          title='Gradebook'
          link='/classlist'
          active={
            router.pathname == '/classlist' || '/classroom' ? true : false
          }
        />
        {/* {router.pathname == '/classroom' && (
          <NavItem
            navSize={navSize}
            icon={BiBookOpen}
            title='Classroom 1'
            link='/classroom'
            active={router.pathname == '/classroom' ? true : false}
          />
        )} */}
        <NavItem navSize={navSize} icon={BiCog} title='Settings' link='#' />
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
              Username
            </Heading>
            <Text color='gray'>Professor</Text>
          </Flex>
          <Spacer />
          <Box width='full' flex='1' align='center'>
            <NextLink href='/' passHref>
              <Link>
                <IconButton aria-label='logout' size='lg' icon={<BiLogOut />}>
                  Logout
                </IconButton>
              </Link>
            </NextLink>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
