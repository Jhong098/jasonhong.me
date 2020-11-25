import React from 'react';
import { NextSeo } from 'next-seo';
import { useColorMode, Heading, Text, Box } from '@chakra-ui/react';

import Container from 'components/PageWrapper';
import { CustomLink } from 'components/MDX';

import { secondaryTextColor } from 'styles/darkMode';
import Image from 'next/image';

const url = 'https://jasonhong.me/about';
const title = 'About Me – Jason Hong';

const About = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      <Container>
        <Box
          as="main"
          p={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          m="0 auto 4rem auto"
          maxWidth="700px"
        >
          <Box>
            <Heading mb={4} as="h1" size="2xl" textAlign="center">
              About Me
            </Heading>
            <Box w={[300, 400, 500]}>
              <Image src="/static/images/me.jpg" width={1079} height={1079} />
            </Box>
          </Box>
          <Box w={[300, 400, 500]} mt={8} maxWidth="700px">
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Nice to see you, I’m Jason. I'm a Computer Engineering student at
              the University of Waterloo.
            </Text>
            <Text color={secondaryTextColor[colorMode]} mb={8}>
              I was born in Nanjing, China and moved to Vancouver, Canada when I
              was 10 years-old. I like to travel, draw and take photos.
            </Text>
          </Box>
          <iframe
            height="280"
            src="https://www.google.com/maps/d/embed?mid=1-IAkVuRwpGjw1DGjpGW85aFYZxDsXzkz&hl=en"
            title="Jason's Travel Map"
            width="100%"
          />
        </Box>
      </Container>
    </>
  );
};

export default About;
