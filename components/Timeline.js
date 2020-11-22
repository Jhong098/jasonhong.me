import {
  useColorMode,
  Heading,
  Text,
  Flex,
  List,
  ListItem,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box
} from '@chakra-ui/react';
import { secondaryTextColor } from 'styles/darkMode';

const TIMELINE_ITEMS = [
  {
    year: '2020',
    items: [
      {
        title: 'Software Development Engineer Intern @ AWS',
        desc: 'Working on Amazon Connect Contact Lens',
        isEmployment: true
      }
    ]
  },
  {
    year: '2019',
    items: [
      {
        title: 'Software Tools and Automation Intern @ Canoo',
        desc:
          'Increased productivity by creating software release management tool with React, TypeScript, Python, and Flask to monitor and control builds for 10+ vehicle components',
        isEmployment: true
      },
      {
        title: 'Organizer @ Hack the North',
        desc:
          'Created delightful web experiences with React, Typescript, and Styled Components for one of the world’s largest hackathons, with more than 30k unique visitors and 3M requests per month',
        isEmployment: false
      },
      {
        title: 'Software Engineering Intern @ StackAdapt',
        desc:
          'Implemented customization and productivity features on a web platform that manages 3000+ ad campaigns with Ruby on Rails, React, and Redux',
        isEmployment: true
      }
    ]
  },
  {
    year: '2018',
    items: [
      {
        title: 'Software Developer Intern @ Monogram',
        desc:
          'Optimized performance and size for Qt application in C++ and photo-editing software plugins',
        isEmployment: true
      }
    ]
  }
];

const YearItems = ({ year, items }) => {
  const { colorMode } = useColorMode();
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading as="h3" size="lg" fontWeight="bold">
            {year}
          </Heading>
        </Box>

        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <List>
          {items.map(({ title, desc }) => (
            <ListItem key={title}>
              <Stack ml={2} mb={4}>
                <Flex align="center">
                  <Text fontWeight="medium">{title}</Text>
                </Flex>
                <Text color={secondaryTextColor[colorMode]} ml={6}>
                  {desc}
                </Text>
              </Stack>
            </ListItem>
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};

const Timeline = () => {
  // const [employmentOnly, setEmploymentOnly] = useState(false);
  return (
    <Flex
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      maxWidth="700px"
    >
      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        {TIMELINE_ITEMS.map(({ year, items }) => (
          <YearItems key={year} year={year} items={items} />
        ))}
      </Accordion>
    </Flex>
  );
};

export default Timeline;
