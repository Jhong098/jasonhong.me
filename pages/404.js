import NextLink from 'next/link';
import { Heading, Flex, Stack, Button } from '@chakra-ui/react';

import PageWrapper from 'components/PageWrapper';

const Error = () => {
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
        <Flex
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          maxWidth="700px"
        >
          <Heading letterSpacing="tight" mb={2} as="h1" size="2xl">
            404 – Are You Lost?
          </Heading>
          <NextLink href="/" passHref>
            <Button p={[1, 4]} w="250px" fontWeight="bold" m="3rem auto 0">
              Return Home
            </Button>
          </NextLink>
        </Flex>
      </Stack>
    </PageWrapper>
  );
};

export default Error;
