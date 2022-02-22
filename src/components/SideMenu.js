import styles from '@/styles/Classrooms.module.css'
import Link from 'next/link'

export default function SideMenu({ option1, route1 }) {
  return (
    <div className={styles.side}>
      <h1 className={styles.head}>Welcome user</h1>
      <ul>
        <li>
          <Link href={'/' + route1}>
            <a>{option1}</a>
          </Link>
        </li>
        <li>
          <Link href={'/classlist'}>
            <a>class lists</a>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <a>Log out</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
