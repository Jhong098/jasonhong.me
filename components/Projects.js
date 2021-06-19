import { Box, SimpleGrid } from '@chakra-ui/react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

import ProjectCard from 'components/ProjectCard';
import {
  BBTIcon,
  HTNIcon,
  VisionMotionIcon,
  SignSenseIcon
} from 'components/CustomIcons';

const PROJECTS = [
  {
    title: 'SignSense',
    description:
      'Real-Time American Sign Language Interpreter with over 85% accuracy',
    href: 'https://github.com/Jhong098/SignSense',
    icon: SignSenseIcon,
    tags: [
      { text: 'Python', color: 'cyan' },
      { text: 'Tensorflow', color: 'blue' },
      { text: 'Keras', color: 'purple' }
    ]
  },
  {
    title: 'hackthenorth.com',
    description:
      'Website for the largest hackathon in Canada with 30,000 monthly visitors',
    href: 'https://2019.hackthenorth.com',
    icon: HTNIcon,
    tags: [
      { text: 'React', color: 'cyan' },
      { text: 'Typescript', color: 'blue' },
      { text: 'Styled-Components', color: 'gray' }
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
      { text: 'Styled-Components', color: 'gray' }
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
      { text: 'Styled-Components', color: 'gray' }
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

const MotionBox = m(Box);
const MotionGrid = m(SimpleGrid);

const Projects = () => {
  const isBigScreen = useMediaQuery({ minWidth: 450 });

  return (
    <LazyMotion features={domAnimation}>
      <MotionGrid
        variants={container}
        initial="hidden"
        animate="show"
        columns={2}
        minChildWidth="300px"
        spacing="20px"
      >
        {PROJECTS.map((props, i) => (
          <MotionBox key={`project-${i}`} variants={listItem}>
            <ProjectCard {...props} isBigScreen={isBigScreen} />
          </MotionBox>
        ))}
      </MotionGrid>
    </LazyMotion>
  );
};

export default Projects;
