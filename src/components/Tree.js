import { useState } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Link } from '@chakra-ui/react'
import {
  AiOutlineFile,
  AiOutlineFolder,
  AiFillCaretRight,
} from 'react-icons/ai'
import { DiJavascript1, DiCss3Full, DiHtml5, DiReact } from 'react-icons/di'
import { BsDot } from 'react-icons/bs' // TODO: add new annuncements, assignments, or messages dot

const FILE_ICONS = {
  js: <DiJavascript1 />,
  css: <DiCss3Full />,
  html: <DiHtml5 />,
  jsx: <DiReact />,
}

// TODO: add icon
const File = ({ name, link, icon, where }) => {
  let ext = name.split('.')[1]

  return (
    <Flex
      flexDir='row'
      paddingLeft='20px'
      display='flex'
      alignItems='center'
      cursor='pointer'
    >
      {name.toLowerCase() === where ? <AiFillCaretRight /> : null}
      {FILE_ICONS[ext] || <AiOutlineFile />}
      <Box marginLeft='5px'>
        <NextLink href={link} passHref>
          <Link>{name}</Link>
        </NextLink>
      </Box>
    </Flex>
  )
}

const Folder = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <Flex flexDir='column' paddingLeft='20px' cursor='pointer'>
      <Box display='flex' alignItems='center' onClick={handleToggle}>
        <AiOutlineFolder />
        <Box marginLeft='5px'>{name}</Box>
      </Box>
      <Box h={isOpen ? 'auto' : '0'} overflow='hidden' isOpen={isOpen}>
        {children}
      </Box>
    </Flex>
  )
}

const TreeRecursive = ({ data, where }) => {
  return data.map((item) => {
    if (item.type === 'file') {
      return <File name={item.name} where={where} link={item.link || '/'} />
    }
    if (item.type === 'folder') {
      return (
        <Folder name={item.name}>
          <TreeRecursive data={item.childrens} />
        </Folder>
      )
    }
    if (item.type === 'title') {
      return (
        <Box fontWeight='bold' mt={2} ml={2}>
          {item.name}
        </Box>
      )
    }
  })
}

const Tree = ({ data, where, children }) => {
  const isImperative = data && !children

  return (
    <Flex flexDir='column' lineHeight={1.5}>
      {isImperative ? <TreeRecursive data={data} where={where} /> : children}
    </Flex>
  )
}

export default Tree
