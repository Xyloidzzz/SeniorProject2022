import {
  extendTheme
} from '@chakra-ui/react'

const theme = extendTheme({
  components: {
    Alert: {
      sizes: {
        sm: {
          h: '15px',
          fontSize: 'md',
          px: '16px',
        },
        xl: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        },
      },
    },
    Drawer: {
      variants: {
        permanent: {
          dialog: {
            pointerEvents: 'auto',
          },
          dialogContainer: {
            pointerEvents: 'none',
          },
        },
      },
    },
  },
})

export default theme