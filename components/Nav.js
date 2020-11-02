import NextLink from 'next/link';

import { useColorMode, Button, Flex, Box, IconButton } from '@chakra-ui/core';
import styled from '@emotion/styled';
import { navBgColor } from 'styles/darkMode';

const LINKS = [
  {
    href: '/',
    text: 'Home'
  },
  {
    href: '/dashboard',
    text: 'Dashboard'
  },
  {
    href: '/blog',
    text: 'Blog'
  },
  {
    href: '/about',
    text: 'About'
  },
  {
    href: '/resume.pdf',
    text: 'Resume'
  }
];

const NavContainer = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1 ease-in-out;
`;

const Nav = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const getLink = ({ href, text }) => (
    <NextLink href={href} passHref key={text}>
      <Button as="a" variant="ghost" p={[1, 4]}>
        {text}
      </Button>
    </NextLink>
  );
  return (
    <NavContainer
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      maxWidth="900px"
      width="100%"
      bg={navBgColor[colorMode]}
      as="nav"
      p={8}
      mt={[0, 8]}
      mb={8}
      mx="auto"
    >
      <Box>{LINKS.map(getLink)}</Box>
      <IconButton
        aria-label="toggle dark mode"
        icon={colorMode === 'dark' ? 'sun' : 'moon'}
        onClick={toggleColorMode}
      />
    </NavContainer>
  );
};

export default Nav;
