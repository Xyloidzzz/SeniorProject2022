import { useState } from 'react'
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from '@chakra-ui/react'
import { BiMenu, BiHome, BiListUl, BiBook, BiCog } from 'react-icons/bi'
import NavItem from '@/components/NavItem'

//TODO: Make Seperate SideBar Children for classlist and classroom
export default function Sidebar() {
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
        <NavItem navSize={navSize} icon={BiHome} title='Dashboard' link='#' />
        <NavItem
          navSize={navSize}
          icon={BiListUl}
          title='Students List'
          link='#'
        />
        <NavItem
          navSize={navSize}
          icon={BiBook}
          title='Gradebook'
          link='/classlist'
          active // TODO: figure out how to pass this from page and active the right one
        />
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
        <Flex mt={4} align='center'>
          <Avatar size='sm' src='avatar.png' />
          <Flex
            flexDir='column'
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Heading as='h3' size='sm'>
              Username
            </Heading>
            <Text color='gray'>Professor</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
