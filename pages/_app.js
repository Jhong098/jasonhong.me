import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  useColorMode
} from '@chakra-ui/core';
import { Global, css } from '@emotion/core';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import theme from '../styles/theme';
import { prismLightTheme, prismDarkTheme } from '../styles/prism';
import SEO from '../next-seo.config';

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          ${colorMode === 'light' ? prismLightTheme : prismDarkTheme};

          ::selection {
            background-color: #47a3f3;
            color: #fefefe;
          }

          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : '#171923'};
          }
        `}
      />
      {children}
    </>
  );
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value="light">
        <GlobalStyle>
          <Head>
            <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            <meta content="#ffffff" name="theme-color" />
            <meta content="#ffffff" name="msapplication-TileColor" />
          </Head>
        </GlobalStyle>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default MyApp;
