import {
  Flex,
  Box,
  Heading,
  Divider,
  Text,
  Button,
  Spacer,
  VStack,
} from '@chakra-ui/react'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import rehypeSanitize from 'rehype-sanitize'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const Markdown = dynamic(
  () => import('@uiw/react-markdown-preview').then((mod) => mod.default),
  {
    ssr: false,
  }
)

// TODO: add a edit button if not student in edit-post link don't let student see? or maybe just modal
// add edit button to full page post instead for ez editing for professor

const AnnouncementBlock = ({
  key,
  title,
  body,
  isHidden,
  userData,
  link,
  ...rest
}) => {
  return (
    <Flex
      width='full'
      p='5'
      shadow='lg'
      borderWidth='2px'
      borderColor='gray.200'
      flexDir='row'
      display={isHidden && userData.isStudent ? 'none' : 'block'}
      {...rest}
    >
      <Box width='full' flex='5' data-color-mode='light'>
        <NextLink href={link} passHref>
          <Heading fontSize='xl' key={key} cursor='pointer'>
            <Markdown source={title} rehypePlugins={[[rehypeSanitize]]} />
          </Heading>
        </NextLink>
        <Divider orientation='horizontal' colorScheme='black' />
        <Text mt={4}>
          <Markdown source={body} rehypePlugins={[[rehypeSanitize]]} />
        </Text>
      </Box>
      <Box
        width='full'
        flex='1'
        align='right'
        display={isHidden && !userData.isStudent ? 'block' : 'none'}
      >
        <AiOutlineEyeInvisible />
      </Box>
    </Flex>
  )
}

export default AnnouncementBlock
