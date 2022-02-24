import { Flex } from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo.js'
import SideMenu from '@/components/SideMenu'
import Sidebar from '@/components/SideBar'

export default function classroom({ column, rows }) {
  return (
    <Flex width='full' m='0' p='0'>
      <HeadInfo title='Classroom' keyword='classroom' description='classroom' />
      <Sidebar />
      {/* <SideMenu option1='edit table' route1='table'></SideMenu> */}
    </Flex>
  )
  classroom.defaultProps = {
    column: 0,
    rows: 0,
  }
}
