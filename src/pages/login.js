import { Container } from '@chakra-ui/react'
import HeadInfo from '@/components/HeadInfo'
import { getSession } from 'next-auth/react'

export default function Login() {
  return (
    <Container>
      <HeadInfo
        title='Redirecting...'
        keyword='redirect'
        description='redirect page'
        icon='/grade_icon.ico'
      />
    </Container>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    const res = await fetch(
      `http://localhost:3000/api/user/${session.user.email}`
    )
    const userInfo = await res.json()
    return {
      redirect: {
        destination: '/' + userInfo.id + '/classlist',
        permanent: false,
      },
    }
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}
