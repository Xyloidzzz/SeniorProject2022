import '@/styles/globals.css'
import theme from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

export default function MyApp({ 
  Component, 
  pageProps: {session, ...pageProps} 
}) {
  return (
    <SessionProvider session ={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
