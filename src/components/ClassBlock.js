import {
  Box,
  Heading,
  Text,
  Link,
  IconButton,
  Divider,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const ClassBlock = ({ key, title, description, link, ...rest }) => {
  return (
    <Flex
      width='full'
      p='5'
      shadow='lg'
      borderWidth='2px'
      borderColor='gray.200'
      flexDir='row'
      {...rest}
    >
      <Box width='full' flex='5'>
        <Heading fontSize='xl' key={title}>
          {title}
        </Heading>
        <Divider orientation='horizontal' colorScheme='black' />
        <Text mt={4} noOfLines={1}>
          {description}
        </Text>
      </Box>
      <Box width='full' flex='1' align='right'>
        <NextLink key={key + 'button'} href={link} passHref>
          <Link>
            <IconButton
              aria-label='Enter Class'
              size='sm'
              icon={<ArrowForwardIcon />}
              mt={4}
              colorScheme='blue'
            >
              Enter
            </IconButton>
          </Link>
        </NextLink>
      </Box>
    </Flex>
  )
}

export default ClassBlock
