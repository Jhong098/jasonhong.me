import React from 'react';
import NextLink from 'next/link';
import useSWR from 'swr';
import format from 'comma-number';
import { useColorMode, Heading, Text, Flex, Box, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import fetcher from 'lib/fetcher';

const BlogPost = ({ title, summary, slug }) => {
  const { colorMode } = useColorMode();
  const secondaryTextColor = {
    light: 'gray.700',
    dark: 'gray.400'
  };

  const { data } = useSWR(`/api/page-views?id=${slug}`, fetcher);
  const views = data?.total;

  return (
    <motion.div whileHover={{ y: -3 }}>
      <NextLink href={`blog/${slug}`} passHref>
        <Link w="100%" _hover={{ textDecoration: 'none' }}>
          <Box mb={8} display="block" width="100%">
            <Flex
              width="100%"
              align="flex-start"
              justifyContent="space-between"
              flexDirection={['column', 'row']}
            >
              <Heading size="md" as="h3" mb={2} fontWeight="medium">
                {title}
              </Heading>
              <Text
                color="gray.500"
                minWidth="105px"
                textAlign={['left', 'right']}
                mb={[4, 0]}
              >
                {`${views ? format(views) : '–––'} views`}
              </Text>
            </Flex>
            <Text color={secondaryTextColor[colorMode]}>{summary}</Text>
          </Box>
        </Link>
      </NextLink>
    </motion.div>
  );
};

export default BlogPost;
