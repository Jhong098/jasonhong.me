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
            description="Landing page for the largest hackathon in Canada that saw 30,000 unique visitors per month"
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
            description="Hack the North 2019 hacker application experience that processed 8000+ applications in total"
            href="https://your.hackthenorth.com/"
            icon="hackthenorth"
            tags={[
              { text: 'React', color: 'cyan' },
              { text: 'Typescript', color: 'blue' },
              { text: 'Styled-Components', color: 'purple' },
              { text: 'Mapbox', color: 'gray' }
            ]}
          />
          <ProjectCard
            title="Hackioca"
            description="Hack the North 2019 April Fool's Prank that attracted thousands of gullible hackers to sign-up"
            href="https://hackioca.com"
            icon="bbt"
            tags={[
              { text: 'React', color: 'cyan' },
              { text: 'Typescript', color: 'blue' },
              { text: 'Styled-Components', color: 'purple' }
            ]}
          />
          <ProjectCard
            title="Vision Motion"
            description="Mobile app that uses the camera to track an object and graph position, velocity, and acceleration"
            href="https://visionmotion.williamqin.com/"
            icon="eye"
            tags={[
              { text: 'Android', color: 'green' },
              { text: 'OpenCV', color: 'orange' }
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
