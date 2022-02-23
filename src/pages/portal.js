import {
  Container,
  Box,
  Stack,
  Link,
  Button,
  IconButton,
} from '@chakra-ui/react'
import styles from '@/styles/Home.module.css'
import HeadInfo from '@/components/HeadInfo'
import NextLink from 'next/link'

export default function Portal() {
  return (
    // TODO: Add a setting that saves a default select through database
    <Container centerContent className={styles.main}>
      <HeadInfo title='Select a Portal' keyword='portal' />
      <Box>
        <Stack spacing={2} align='center'>
          <NextLink href='#' passHref>
            <Link style={{ textDecoration: 'none' }}>
              <Button mt={4} colorScheme='blue'>
                Student
              </Button>
            </Link>
          </NextLink>
          <NextLink href='/classlist' passHref>
            <Link style={{ textDecoration: 'none' }}>
              <Button mt={4} colorScheme='blue'>
                Educator
              </Button>
            </Link>
          </NextLink>
        </Stack>
      </Box>
    </Container>
  )
}
