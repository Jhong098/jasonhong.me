import { MDXProvider } from '@mdx-js/react';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { prismLightTheme, prismDarkTheme } from 'styles/prism';
import SEO from 'next-seo.config';
import MDXComponents from 'components/MDX';
import theme from 'styles/theme';
import { Chakra } from 'components/Chakra';
import { css } from '@emotion/react';
import { useColorModeValue } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps, cookies }) => {
  const prismTheme = useColorModeValue(prismLightTheme, prismDarkTheme);
  return (
    <Chakra
      theme={theme}
      cookies={cookies}
      styles={css`
        ${prismTheme}
      `}
    >
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
    </Chakra>
  );
};

export default MyApp;

export { getServerSideProps } from 'components/Chakra';
