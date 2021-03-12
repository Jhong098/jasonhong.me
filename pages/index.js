import {
  useColorMode,
  Heading,
  Text,
  Flex,
  Stack,
  Box,
  Fade
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { BBTIcon, HTNIcon, VisionMotionIcon } from 'components/CustomIcons';
import PageWrapper from 'components/PageWrapper';
import ProjectCard from 'components/ProjectCard';
import Timeline from 'components/Timeline';
import { motion } from 'framer-motion';
import { secondaryTextColor } from 'styles/darkMode';

const PROJECTS = [
  {
    title: 'hackthenorth.com',
    description:
      'Landing page for the largest hackathon in Canada that saw 30,000 unique visitors per month',
    href: 'https://2019.hackthenorth.com',
    icon: HTNIcon,
    tags: [
      { text: 'React', color: 'cyan' },
      { text: 'Typescript', color: 'blue' },
      { text: 'Styled-Components', color: 'purple' }
    ]
  },
  {
    title: 'Hacker Applications',
    description:
      'Hack the North 2019 hacker application experience that processed 8000+ applications in total',
    href: 'https://your.hackthenorth.com/',
    icon: HTNIcon,
    tags: [
      { text: 'React', color: 'cyan' },
      { text: 'Typescript', color: 'blue' },
      { text: 'Styled-Components', color: 'purple' },
      { text: 'Mapbox', color: 'gray' }
    ]
  },
  {
    title: 'Hackioca',
    description:
      "Hack the North 2019 April Fool's Prank that attracted thousands of gullible hackers to sign-up",
    href: 'https://hackioca.com',
    icon: BBTIcon,
    tags: [
      { text: 'React', color: 'cyan' },
      { text: 'Typescript', color: 'blue' },
      { text: 'Styled-Components', color: 'purple' }
    ]
  },
  {
    title: 'Vision Motion',
    description:
      'Mobile app that uses the camera to track an object and graph position, velocity, and acceleration',
    href: 'https://visionmotion.williamqin.com/',
    icon: VisionMotionIcon,
    tags: [
      { text: 'Android', color: 'green' },
      { text: 'OpenCV', color: 'orange' }
    ]
  }
];

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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

const MotionBox = motion(Box);

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
              Hi, I'm Jason Hong
            </Heading>
            <Text color={secondaryTextColor[colorMode]}>
              A Computer Engineering student at the University of Waterloo
              currently working at Amazon Web Services as an SDE Intern. I like
              to travel, draw and take photos.
            </Text>
          </Fade>
        </Section>
        <Section>
          <Fade in>
            <SectionHeading>Projects</SectionHeading>
          </Fade>

          <MotionBox variants={container} initial="hidden" animate="show">
            {PROJECTS.map((props, i) => (
              <MotionBox key={`project-${i}`} variants={listItem} mb={2}>
                <ProjectCard {...props} />
              </MotionBox>
            ))}
          </MotionBox>
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
