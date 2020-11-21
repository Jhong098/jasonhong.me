import { NextSeo } from 'next-seo';
import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/react';

import Container from 'components/PageWrapper';

import { secondaryTextColor } from 'styles/darkMode';

const DESC = "Here's what I'm currently using to create things.";
const url = 'https://jasonhong.me/tools';

export default function UsesLayout({ children }) {
  const { colorMode } = useColorMode();

  return (
    <Container>
      <NextSeo
        title="Tools – Jason Hong"
        description={DESC}
        canonical={url}
        openGraph={{
          url,
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
          <Heading mb={2} as="h1" size="2xl">
            My Tools
          </Heading>
          <Flex mt={2} w="100%">
            <Text fontSize="sm" color={secondaryTextColor[colorMode]}>
              {DESC}
            </Text>
          </Flex>
        </Flex>
        {children}
      </Stack>
    </Container>
  );
}
