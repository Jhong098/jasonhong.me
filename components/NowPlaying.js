import useSWR from 'swr';
import {
  Box,
  Link,
  Stack,
  Image,
  Text,
  Icon,
  Skeleton,
  useColorMode
} from '@chakra-ui/react';

import fetcher from 'lib/fetcher';

import { borderColor } from 'styles/darkMode';

const NowPlaying = () => {
  const { data } = useSWR('/api/now-playing', fetcher);
  const { colorMode } = useColorMode();

  return (
    <Box
      mb={4}
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      border="1px solid"
      borderRadius={8}
      borderColor={borderColor[colorMode]}
      p={2}
      w="300px"
    >
      <Skeleton isLoaded={data}>
        <Image
          alt="Spotify album cover"
          height="60px"
          width="60px"
          borderRadius={8}
          src={data?.albumImageUrl || '/static/images/placeholder.jpg'}
        />
      </Skeleton>
      <Stack
        spacing={0}
        justifyContent="center"
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        ml={3}
      >
        <Link
          fontWeight="medium"
          maxWidth="190px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          href={data?.songUrl}
          isExternal
        >
          {data && (data?.title || 'Not Playing')}
        </Link>
        <Text
          color="gray.500"
          mb={4}
          maxWidth="190px"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {data && (data?.artist || 'Spotify')}
        </Text>
      </Stack>
      <Icon name="spotify" ml="auto" mt={1} />
    </Box>
  );
};

export default NowPlaying;
