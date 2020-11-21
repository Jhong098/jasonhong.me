import {
  ChakraProvider,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { MDXProvider } from '@mdx-js/react';
import { Global, css } from '@emotion/react';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import { prismLightTheme, prismDarkTheme } from 'styles/prism';
import SEO from 'next-seo.config';
import MDXComponents from 'components/MDX';
import theme from 'styles/theme';

const GlobalStyle = ({ children }) => {
  const { colorMode } = useColorMode();
  const prismTheme = useColorModeValue(prismLightTheme, prismDarkTheme);
  const bgColor = useColorModeValue('white', '#171923');
  console.log(colorMode);

  return (
    <>
      <Global
        styles={css`
          ${prismTheme};

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
            background: ${bgColor};
          }
        `}
      />
      {children}
    </>
  );
};

const MyApp = ({ Component, pageProps }) => (
  <ChakraProvider resetCSS theme={theme}>
    <MDXProvider components={MDXComponents}>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
      </Head>

      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </MDXProvider>
  </ChakraProvider>
);

export default MyApp;
