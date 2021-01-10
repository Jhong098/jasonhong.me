import {
  Box,
  Alert,
  Code,
  Heading,
  Kbd,
  Link,
  Text,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import NextLink from 'next/link';

const Table = (props) => (
  <Box overflowX="scroll" w="full">
    <Box as="table" textAlign="left" mt="32px" w="full" {...props} />
  </Box>
);

const THead = (props) => {
  const bg = useColorModeValue('gray.50', 'whiteAlpha.100');

  return (
    <Box as="th" bg={bg} fontWeight="semibold" p={2} fontSize="sm" {...props} />
  );
};

const TData = (props) => (
  <Box
    as="td"
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const StyledCallout = styled(Alert)`
  > *:first-of-type {
    margin-top: 0;
    margin-left: 8;
  }
`;

const StyledHeading = styled(Heading)`
  scroll-margin-top: 100px;
  scroll-snap-margin: 100px;
  &[id] {
    pointer-events: none;
  }
  &[id]:before {
    display: block;
    height: 2rem;
    margintop: -2rem;
    visibility: hidden;
    content: '';
  }
  &[id]:hover a {
    opacity: 1;
  }
`;

const CustomLink = (props) => {
  const color = useColorModeValue('hsl(208, 99%, 44%)', 'hsl(208, 95%, 68%)');

  const { href } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <NextLink href={href} passHref>
        <Link color={color} {...props} />
      </NextLink>
    );
  }

  return <Link color={color} isExternal {...props} />;
};

const Quote = (props) => {
  const bgColor = useColorModeValue('blue.50', 'blue.900');

  return (
    <StyledCallout
      mt={4}
      w="98%"
      bg={bgColor}
      variant="left-accent"
      status="info"
      {...props}
    />
  );
};

const DocsHeading = (props) => (
  <StyledHeading {...props} mb="1em" mt="1em">
    <Box pointerEvents="auto">
      {props.children}
      {props.id && (
        <Box
          aria-label="anchor"
          as="a"
          color="blue.500"
          fontWeight="normal"
          outline="none"
          _focus={{
            opacity: 1,
            boxShadow: 'outline'
          }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </Box>
      )}
    </Box>
  </StyledHeading>
);

const Hr = () => {
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return <Divider borderColor={borderColor} my={4} w="100%" />;
};

const MDXComponents = {
  h1: (props) => <Heading as="h1" size="xl" my={1} {...props} />,
  h2: (props) => <DocsHeading as="h2" fontWeight="bold" size="lg" {...props} />,
  h3: (props) => <DocsHeading as="h3" size="md" fontWeight="bold" {...props} />,
  inlineCode: (props) => (
    <Code colorScheme="yellow" fontSize="0.84em" {...props} />
  ),
  kbd: Kbd,
  br: (props) => <Box height="24px" {...props} />,
  hr: Hr,
  table: Table,
  th: THead,
  td: TData,
  a: CustomLink,
  p: (props) => <Text as="p" mt={4} lineHeight="tall" {...props} />,
  ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
  ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
  li: (props) => <Box as="li" pb={1} {...props} />,
  blockquote: Quote
};

export { CustomLink };
export default MDXComponents;
