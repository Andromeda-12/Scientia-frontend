import { extendTheme } from '@chakra-ui/react'

const settings = {
  colors: {
    primary: {
      main: '#000000',
      hover: '#424242',
      disabled: '#6B6B6B'
    },
    secondary: {
      main: '#fff',
      hover: '#262626'
    },
    text: {
      main: '#fff',
      black: '#000'
    }
  },

  components: {
    Input: {
      defaultProps: {
        variant: 'flushed'
      }
    },
    IconButton: {
      variants: {
        default: {
          color: 'transparent',
          _hover: {
            bg: 'transparent'
          }
        }
      },
      defaultProps: {}
    },
    Button: {
      variants: {
        default: {
          color: 'text.main',
          // border: '2px dashed',
          rounded: false,
          bg: 'primary.main',
          _hover: {
            bg: 'primary.main'
          }
        }
      },
      defaultProps: {
        variant: 'default'
      }
    },
    Text: {
      variants: {
        link: {
          as: 'a',
          _hover: {
            cursor: 'pointer'
          }
        }
      }
    },
    Checkbox: {
      variants: {
        default: {
          colorScheme: 'gray'
        }
      },
      defaultProps: {
        variant: 'default'
      }
    }
  }
}

export const theme = extendTheme(settings)
