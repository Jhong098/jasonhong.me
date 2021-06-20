import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Fade
} from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from '@emotion/styled';

import PageWrapper from 'components/PageWrapper';
import Timeline from 'components/Timeline';
import UnderlinedLink from 'components/UnderlinedLink';
import Projects from 'components/Projects';
import { secondaryTextColor } from 'styles/darkMode';

const Section = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 700px;
`;

const SectionHeading = ({ children }) => (
  <Heading mb={4} size="xl" fontWeight={700}>
    {children}
  </Heading>
);

const Index = () => {
  const { colorMode } = useColorMode();

  return (
    <PageWrapper>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="700px"
      >
        <Section>
          <Fade in>
            <Heading mb={6} as="h1" size="2xl">
              Hi, I'm{' '}
              <NextLink href="/resume.pdf" passHref>
                <UnderlinedLink>Jason Hong</UnderlinedLink>
              </NextLink>
            </Heading>
            <Text color={secondaryTextColor[colorMode]}>
              A recent Computer Engineering graduate from the University of
              Waterloo currently working at Amazon Web Services as an SDE. I
              like to travel, draw and take photos.
            </Text>
          </Fade>
        </Section>
        <Section>
          <Fade in>
            <SectionHeading>Projects</SectionHeading>
            <Projects />
          </Fade>
        </Section>
        <Section>
          <Fade in>
            <SectionHeading>Timeline</SectionHeading>
            <Timeline />
          </Fade>
        </Section>
      </Stack>
    </PageWrapper>
  );
};

export default Index;
