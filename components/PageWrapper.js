import { useColorMode, Button, Flex, Box, IconButton } from '@chakra-ui/core';

import Footer from './Footer';
import { primaryTextColor, bgColor } from 'styles/darkMode';
import Nav from './Nav';

const PageWrapper = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Nav />
      <Flex
        as="main"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
        bg={bgColor[colorMode]}
        color={primaryTextColor[colorMode]}
        px={8}
      >
        {children}
        <Footer />
      </Flex>
    </>
  );
};

export default PageWrapper;
