import React from 'react';
import { NextSeo } from 'next-seo';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  SimpleGrid
} from '@chakra-ui/core';

import PageViews from 'components/metrics/PageViews';
// import Buttondown from '../components/metrics/Buttondown';
import PageWrapper from 'components/PageWrapper';
import GitHub from 'components/metrics/Github';
import TopTracks from 'components/TopTracks';
// import { CustomLink } from 'components/MDX';

import { secondaryTextColor } from 'styles/darkMode';

const url = 'https://jasonhong.me/dashboard';
const title = 'Dashboard – Jason Hong';
const description =
  'My personal dashboard, built with Next.js API routes deployed as serverless functions.';

const Dashboard = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description
          //   images: [
          //     {
          //       url: 'https://jasonhong.me/static/images/dashboard.jpg',
          //       alt: description,
          //       width: 1280,
          //       height: 720
          //     }
          //   ]
        }}
      />
      <PageWrapper>
        <Stack
          as="main"
          spacing={8}
          justifyContent="center"
          alignItems="flex-start"
          m="0 auto 4rem auto"
          maxWidth="700px"
        >
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
          >
            <Heading mb={2} as="h1" size="2xl">
              Dashboard
            </Heading>
            <Text color={secondaryTextColor[colorMode]}>
              This is my personal dashboard, built with Next.js API routes
              deployed as serverless functions. I use this dashboard to track
              various metrics across platforms.
            </Text>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            maxWidth="700px"
            mt={8}
          >
            {/* <Unsplash /> */}
            {/* <YouTube /> */}
            <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
              <PageViews />
              <GitHub />
            </SimpleGrid>
            {/* <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
              <Gumroad />
              <Buttondown />
            </SimpleGrid> */}
          </Flex>
          <Heading as="h2" size="xl">
            Top Tracks
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            What I'm currently jamming to...
          </Text>
          <TopTracks />
        </Stack>
      </PageWrapper>
    </>
  );
};

export default Dashboard;
