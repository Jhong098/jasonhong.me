import React from 'react';
import { NextSeo } from 'next-seo';
import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Link,
  Icon
} from '@chakra-ui/react';

import Container from 'components/PageWrapper';
import { CustomLink } from 'components/MDX';

import { secondaryTextColor } from 'styles/darkMode';

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
              About Me
            </Heading>
            <Text color={secondaryTextColor[colorMode]} mb={4}>
              Nice to see you, I’m Jason. I'm a Computer Engineering student at
              the University of Waterloo.
            </Text>
            <Text color={secondaryTextColor[colorMode]} mb={8}>
              I was born in Nanjing, China and moved to Vancouver, Canada when I
              was 10 years-old. I like to travel, draw and take photos.
            </Text>

            <iframe
              height="280"
              src="https://www.google.com/maps/d/embed?mid=1-IAkVuRwpGjw1DGjpGW85aFYZxDsXzkz&hl=en"
              title="Lee's Travel Map"
              width="100%"
            />
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default About;
