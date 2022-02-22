import styles from '@/styles/Classrooms.module.css'
import HeadInfo from '@/components/HeadInfo.js'
import Link from 'next/link'
import SideMenu from '@/components/SideMenu'

export default function classroom({column,rows}){
    return(
        <div>
            <HeadInfo title="classroom name"></HeadInfo>
            <SideMenu option1="edit table" route1="table"></SideMenu>
        </div>
    )
    classroom.defaultProps = {
        column:0,
        rows:0
    }
}