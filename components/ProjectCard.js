import {
  Flex,
  Link,
  Heading,
  Text,
  Stack,
  useColorMode,
  Badge
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

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

const ProjectCard = ({ title, description, href, icon, tags, isBigScreen }) => {
  const { colorMode } = useColorMode();

  return (
    <motion.div
      whileHover={{ y: -2, opacity: 0.7 }}
      transition={{ duration: 0.1 }}
    >
      <Link
        mb={4}
        href={href}
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
          {isBigScreen &&
            icon({
              'aria-label': title,
              color: iconColor[colorMode],
              boxSize: '63px',
              ml: 2,
              mr: 6
            })}
          <Stack>
            <Text size="xl" fontWeight="medium" mb={3} letterSpacing="wide">
              {title}
            </Text>
            <Text lineHeight="1.3">{description}</Text>
            <Flex mt={2} wrap="wrap">
              {tags.map(getBadge)}
            </Flex>
          </Stack>
        </Flex>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
