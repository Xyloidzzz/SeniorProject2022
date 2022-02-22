import HeadInfo from '@/components/HeadInfo.js'
import SideMenu from '@/components/SideMenu'

export default function classroom({ column, rows }) {
  return (
    <div>
      <HeadInfo title='Classroom' keyword='classroom' description='classroom' />

      <SideMenu option1='edit table' route1='table'></SideMenu>
    </div>
  )
  classroom.defaultProps = {
    column: 0,
    rows: 0,
  }
}
