import React from 'react';
import { NextSeo } from 'next-seo';
import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/core';

import Container from 'components/PageWrapper';

const DESC =
  "Here's what tech I'm currently using for coding, photography, painting, and music.";

export default function UsesLayout({ children }) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  return (
    <Container>
      <NextSeo
        title="Uses – Jason Hong"
        description={DESC}
        canonical="https://leerob.io/uses"
        openGraph={{
          url: 'https://leerob.io/uses',
          title: 'Uses – Lee Robinson',
          description: DESC
        }}
      />
      <Stack
        as="section"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
        w="100%"
      >
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
          w="100%"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            My Gear
          </Heading>
          <Flex mt={2} w="100%">
            <Text fontSize="sm" color={textColor[colorMode]}>
              {DESC}
            </Text>
          </Flex>
        </Flex>
        {children}
      </Stack>
    </Container>
  );
}
