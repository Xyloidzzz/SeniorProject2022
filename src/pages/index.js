import { Container, Box } from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import HeadInfo from '@/components/HeadInfo'

export default function Home() {
  return (
    <Container>
      <HeadInfo
        title='GradeBook'
        keyword='home'
        description='gradebook system'
        icon='/favicon.ico'
      />

      <Box className={styles.main}>
        <h1 className={styles.title}>GradeBook</h1>

        <div>
          <form action='/classlist' className={styles.card}>
            <label htmlFor='username'> Username</label>
            <br />
            <input type='text'></input>
            <br />
            <label htmlFor='password'>Password</label>
            <br />
            <input type='text'></input>
            <br />
            <input type='submit' value='Login'></input>
          </form>
        </div>
      </Box>
    </Container>
  )
}
