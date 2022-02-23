import { Box, Heading, Text, Link, IconButton, Divider } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'

const ClassBlock = ({ title, description, link, ...rest }) => {
  return (
    <Box p={5} shadow='md' borderWidth='1px' {...rest}>
      <Heading fontSize='xl'>{title}</Heading>
      <Divider orientation='horizontal' colorScheme='black' />
      <Text mt={4}>{description}</Text>
      <NextLink href={link} passHref>
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
  )
}

export default ClassBlock
