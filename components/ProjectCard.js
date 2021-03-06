import {
  Flex,
  Link,
  Heading,
  Text,
  Stack,
  useColorMode,
  Badge
} from '@chakra-ui/react';

import { borderColor, iconColor } from 'styles/darkMode';

const getBadge = ({ text, color }) => (
  <Badge
    colorScheme={color}
    mr={2}
    mb={2}
    key={text}
    pt={1}
    pb={1}
    pl={2}
    pr={2}
  >
    {text}
  </Badge>
);

const ProjectCard = ({ title, description, href, icon, tags }) => {
  const { colorMode } = useColorMode();

  return (
    <Link
      mb={4}
      href={href}
      //   onClick={() => trackGoal(title)}
      title={title}
      isExternal
      _hover={{
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        textDecoration: 'none'
      }}
    >
      <Flex
        align="center"
        border="1px solid"
        borderColor={borderColor[colorMode]}
        borderRadius={4}
        p={4}
      >
        {icon({
          'aria-label': title,
          color: iconColor[colorMode],
          boxSize: '63px',
          ml: 2,
          mr: 6
        })}
        <Stack>
          <Heading as="h4" size="md" fontWeight="bold" mb={4}>
            {title}
          </Heading>
          <Text lineHeight="1.3">{description}</Text>
          <Flex mt={2} wrap="wrap">
            {tags.map(getBadge)}
          </Flex>
        </Stack>
      </Flex>
    </Link>
  );
};

export default ProjectCard;
