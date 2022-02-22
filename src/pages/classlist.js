import HeadInfo from '@/components/HeadInfo'
import list from '@/styles/Classrooms.module.css'
import Link from 'next/link'

const classList = () => {
  return (
    <>
      <div>
        <HeadInfo
          title='Classrooms'
          keyword='classrooms'
          description='classroom list'
        />

        <h1 className={list.head}>My class lists</h1>
        <button>Edit</button>
        <button>Add Class</button>
        <main className={list.main}>
          <ul>
            <li>
              <h2>Class Name1</h2>
              <Link href='/classroom' passHref>
                <button>Enter</button>
              </Link>
            </li>
            {/* <li>
                    <h2>Class Name2</h2>                        
                    <button>Enter</button>
                </li>
                <li>
                    <h2>Class Name3</h2>
                    <button>Enter</button>
                </li>
                <li>
                    <h2>Class Name4</h2>                        
                    <button>Enter</button>
                </li> */}
          </ul>
        </main>
      </div>
    </>
  )
}

export default classList
