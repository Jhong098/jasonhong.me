import { theme as chakraTheme, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { prismLightTheme, prismDarkTheme } from 'styles/prism';

const config = {
  // useSystemColorMode: true,
  initialColorMode: 'system'
};

const styles = {
  global: (props) => ({
    '::selection': {
      backgroundColor: '#47a3f3',
      color: '#fefefe'
    },
    html: {
      minWidth: '360px',
      scrollBehavior: 'smooth'
    },
    '#__next': {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: mode('white', '#171923')(props)
    }
  })
};

const theme = extendTheme({
  ...chakraTheme,
  config,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  styles,
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  }
});

export default theme;
