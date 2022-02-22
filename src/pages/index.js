import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Grade Book</title>
        <meta name="description" content="gradebook system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Grade Book 
        </h1>

        <div>
          <form action="/classlist" className={styles.card}>
            <label htmlFor="username"> Username</label><br></br>
            <input type="text"></input><br/>
            <label htmlFor="password">Password</label><br/>
            <input type="text"></input><br/>
            <input type="submit" value="Login"></input>
          </form>
        </div>
      </main>

      
    </div>
  )
}
