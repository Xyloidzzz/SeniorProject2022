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
  BiArrowBack,
  BiLogOut,
  BiCog,
} from 'react-icons/bi'
import NavItem from '@/components/NavItem'
import { signOut } from 'next-auth/react'
import Tree from './Tree'

// TODO: Change style of Side bar to more folder-like structure.
// Make width bigger and make font smaller with folder icons little arrows

// TODO: add if statement to check if user is student or teacher and change to their respective nav items
// student: Classes = Assignments, Grades, Announcements
// instructor: Classes = Announcements, Gradebook, Attendance, Settings

export default function Sidebar({ userData, inClass, classData, where }) {
  const router = useRouter()
  const [navSize, changeNavSize] = useState('large')

  const getClasses = () => {
    return classData.map((classItem) => {
      return {
        type: 'file',
        name:
          classItem.department +
          ' ' +
          classItem.classNum +
          '-' +
          classItem.sectionNum,
        link: '/classroom/' + classItem.sectionID,
      }
    }, [])
  }

  const structure = []

  if (inClass) {
    if (!userData.isStudent) {
      structure.push(
        {
          type: 'title',
          name:
            classData.department +
            ' ' +
            classData.classNum +
            '-' +
            classData.sectionNum,
        },
        {
          type: 'file',
          name: 'Announcements',
          link: '/classroom/' + classData.sectionID,
          where: 'announcements',
        },
        {
          type: 'file',
          name: 'Assignments',
          link: '/classroom/' + classData.sectionID + '/assignments',
          where: 'assignments',
        },
        {
          type: 'file',
          name: 'Attendance',
          link: '/classroom/' + classData.sectionID + '/attendance',
          where: 'attendance',
        },
        {
          type: 'file',
          name: 'Gradebook',
          link: '/classroom/' + classData.sectionID + '/gradebook',
          where: 'gradebook',
        },
        {
          type: 'file',
          name: 'Settings',
          link: '/classroom/' + classData.sectionID + '/settings',
          where: 'settings',
        }
      )
    } else {
      structure.push(
        {
          type: 'title',
          name:
            classData.department +
            ' ' +
            classData.classNum +
            '-' +
            classData.sectionNum,
        },
        {
          type: 'file',
          name: 'Announcements',
          link: '/classroom/' + classData.sectionID,
          where: 'announcements',
        },
        {
          type: 'file',
          name: 'Assignments',
          link: '/classroom/' + classData.sectionID + '/assignments',
          where: 'assignments',
        },
        {
          type: 'file',
          name: 'Attendance',
          link: '/classroom/' + classData.sectionID + '/attendance',
          where: 'attendance',
        },
        {
          type: 'file',
          name: 'Grades',
          link: '/classroom/' + classData.sectionID + '/grades',
          where: 'grades',
        },
        {
          type: 'file',
          name: 'Settings',
          link: '/classroom/' + classData.sectionID + '/settings',
          where: 'settings',
        }
      )
    }
  } else {
    if (!userData.isStudent) {
      structure.push(
        {
          type: 'title',
          name: userData.firstName + ' ' + userData.lastName,
        },
        { type: 'file', name: 'Home', link: '/classlist' }
      )
      structure.push({
        type: 'folder',
        name: 'Classes',
        childrens: getClasses(),
      })
      structure.push(
        { type: 'file', name: 'All Messages', link: '/messages' },
        { type: 'file', name: 'Settings', link: '/settings' }
      )
    } else {
      structure.push(
        {
          type: 'title',
          name: userData.firstName + ' ' + userData.lastName,
        },
        { type: 'file', name: 'Home', link: '/classlist' }
      )
      structure.push({
        type: 'folder',
        name: 'Classes',
        childrens: getClasses(),
      })
      structure.push(
        { type: 'file', name: 'Announcements', link: '/announcements' },
        { type: 'file', name: 'Final Grades', link: '/finalgrades' },
        { type: 'file', name: 'Attendance', link: '/attendance' },
        { type: 'file', name: 'All Messages', link: '/messages' },
        { type: 'file', name: 'Settings', link: '/settings' }
      )
    }
  }

  return (
    <Flex
      pos='sticky'
      h='100vh'
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.05)'
      borderRight='1px'
      borderColor='gray.200'
      w={navSize == 'small' ? '75px' : '220px'}
      flexDir='column'
      justifyContent='space-between'
      backgroundColor='gray.100'
    >
      {console.log(classData)}
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
          icon={<BiArrowBack />}
          onClick={() => {
            router.back()
          }}
        />
        {/* <NavItem
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
          link='/studentsList'
          active={router.pathname == '/studentsList' ? true : false}
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
        <NavItem navSize={navSize} icon={BiCog} title='Settings' link='#' /> */}
        <Tree data={structure} where={where} />
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
            <Heading as='h3' size='sm' orientation='horizontal'>
              {userData.firstName + ' ' + userData.lastName}
            </Heading>
            <Text color='gray'>
              {userData.isStudent ? 'Student' : 'Professor'}
            </Text>
          </Flex>
          <Spacer />
          <Box width='full' flex='1' align='center'>
            <IconButton
              aria-label='logout'
              size='lg'
              icon={<BiLogOut />}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Logout
            </IconButton>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
