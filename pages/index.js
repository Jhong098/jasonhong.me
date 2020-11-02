import { useColorMode, Heading, Text, Flex, Stack } from '@chakra-ui/core';
import styled from '@emotion/styled';

import PageWrapper from 'components/PageWrapper';
import ProjectCard from 'components/ProjectCard';
import Timeline from 'components/Timeline';

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
          <Heading mb={2} as="h1" size="2xl">
            Hi, I'm Jason Hong
          </Heading>
          <Text color={secondaryTextColor[colorMode]}>
            I'm a Computer Engineering student at the University of Waterloo
            currently working at Amazon Web Services as an SDE Intern. I like to
            travel, draw and take photos.
          </Text>
        </Section>
        <Section>
          <SectionHeading>Projects</SectionHeading>
          <ProjectCard
            title="hackthenorth.com"
            description="Hack the North landing page 2019"
            href="https://2019.hackthenorth.com"
            icon="hackthenorth"
            tags={[
              { text: 'React', color: 'cyan' },
              { text: 'Typescript', color: 'blue' },
              { text: 'Styled-Components', color: 'purple' }
            ]}
          />
          <ProjectCard
            title="Hacker Applications"
            description="Hack the North 2019 Hacker Application"
            href="https://your.hackthenorth.com/"
            icon="hackthenorth"
            tags={[
              { text: 'React', color: 'cyan' },
              { text: 'Typescript', color: 'blue' },
              { text: 'Styled-Components', color: 'purple' },
              { text: 'Mapbox', color: 'grey' }
            ]}
          />
        </Section>
        <Section>
          <SectionHeading>Timeline</SectionHeading>
          <Timeline />
        </Section>
      </Stack>
    </PageWrapper>
  );
};

export default Index;
