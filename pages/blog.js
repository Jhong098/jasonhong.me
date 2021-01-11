import { NextSeo } from 'next-seo';
import { Heading, Flex, Stack } from '@chakra-ui/react';
import PageWrapper from 'components/PageWrapper';
import BlogPost from 'components/BlogPost';

import { frontMatter as blogPosts } from './blog/*.mdx';

const url = 'https://jasonhong.me/blog';
const title = 'Blog – Jason Hong';
const description = 'My thoughts in text form.';

const Blog = () => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{ url, title, description }}
      />
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
            <Heading mb={2} as="h1" size="2xl">
              Blog
            </Heading>
          </Flex>
          <Flex>
            {blogPosts.map((frontMatter) => (
              <BlogPost key={frontMatter.title} {...frontMatter} />
            ))}
          </Flex>
        </Stack>
      </PageWrapper>
    </>
  );
};

export default Blog;
