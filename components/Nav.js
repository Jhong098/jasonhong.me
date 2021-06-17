import NextLink from 'next/link';

import {
  useDisclosure,
  useColorMode,
  Button,
  Flex,
  Box,
  IconButton,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import { navBgColor } from 'styles/darkMode';
import { useMediaQuery } from 'react-responsive';

const LINKS = [
  {
    href: '/',
    text: 'home'
  },
  {
    href: '/dashboard',
    text: 'dashboard'
  },
  {
    href: '/blog',
    text: 'blog'
  },
  {
    href: '/about',
    text: 'about'
  },
  {
    href: '/photos',
    text: 'photos'
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
  const bg = useColorModeValue(navBgColor.light, navBgColor.dark);
  const isBigScreen = useMediaQuery({ minWidth: 600 });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getLink = ({ href, text }) => (
    <NextLink href={href} passHref key={text}>
      <Button as="a" variant="ghost" p={[6, 4]} fontSize={['xl', 'lg']}>
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
      bg={bg}
      as="nav"
      p={8}
      mt={[0, 8]}
      mb={8}
      mx="auto"
    >
      {isBigScreen && (
        <IconButton
          aria-label="toggle dark mode"
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          onClick={toggleColorMode}
        />
      )}

      {isBigScreen ? (
        <Box>{LINKS.map(getLink)}</Box>
      ) : (
        <IconButton
          aria-label="toggle hambuger menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
        />
      )}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Flex
                direction="column"
                justifyContent="center"
                height="100%"
                alignItems="center"
              >
                <IconButton
                  boxSize="50px"
                  mb="6"
                  aria-label="toggle dark mode"
                  icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
                  onClick={toggleColorMode}
                />
                {LINKS.map(getLink)}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </NavContainer>
  );
};

export default Nav;
