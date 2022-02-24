import { useRouter } from 'next/router'
import { Flex, Text, Icon, Link, Menu, MenuButton } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function NavItem({ icon, title, link, active, navSize }) {
  const router = useRouter()
  return (
    <Flex
      mt={15}
      flexDir='column'
      w='100%'
      alignItems={navSize == 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement='right'>
        <NextLink href={link} passHref>
          <Link
            backgroundColor={active && 'blue.100'}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: 'none', backgroundColor: 'blue.100' }}
            w={navSize == 'large' && '100%'}
          >
            <MenuButton w='100%'>
              <Flex>
                <Icon
                  as={icon}
                  fontSize='xl'
                  color={active ? 'blue.400' : 'gray.500'}
                />
                <Text ml={5} display={navSize == 'small' ? 'none' : 'flex'}>
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Link>
        </NextLink>
      </Menu>
    </Flex>
  )
}
