/* eslint-disable no-param-reassign */
import path from 'path';
import fs from 'fs';
import sizeOf from 'image-size';

import PageWrapper from 'components/PageWrapper';
import Gallery from 'components/Gallery';
import { useState } from 'react';
import { Stack, Tag, TagIcon, TagLabel } from '@chakra-ui/react';

const TRAVEL_FILTERS_INIT = {
  HK: true,
  Taiwan: true,
  Japan: true,
  Vancouver: true
};

const Photos = ({ images }) => {
  const [all, setAll] = useState(true);
  const [filters, setFilters] = useState(TRAVEL_FILTERS_INIT);

  return (
    <PageWrapper>
      <Stack spacing={4} isInline flexWrap="wrap">
        {Object.entries(filters).map(([key, value]) => (
          <Tag
            size="lg"
            mb="2"
            key={key}
            _hover={{
              cursor: 'pointer'
            }}
            colorScheme={value ? 'cyan' : 'gray'}
            variant={value ? 'solid' : 'outline'}
            onClick={() => {
              if (filters[key]) {
                setAll(false);
              }
              setFilters({ ...filters, [key]: !filters[key] });
            }}
          >
            <TagIcon icon={value ? 'minus' : 'add'} size="12px" />
            <TagLabel>{key}</TagLabel>
          </Tag>
        ))}
        <Tag
          size="lg"
          mb={2}
          _hover={{ cursor: all ? 'default' : 'pointer' }}
          colorScheme={all ? 'cyan' : 'gray'}
          onClick={() => {
            if (!all) {
              setFilters(TRAVEL_FILTERS_INIT);
            }
            setAll(!all);
          }}
        >
          <TagLabel>All</TagLabel>
        </Tag>
      </Stack>
      <Gallery images={images.filter(({ location }) => filters[location])} />
    </PageWrapper>
  );
};

export async function getStaticProps() {
  const recFindByExt = (base, ext, files, result) => {
    files = files || fs.readdirSync(base);
    result = result || [];

    files.forEach((file) => {
      const newbase = path.join(base, file);
      if (fs.statSync(newbase).isDirectory()) {
        result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result);
      } else if (file.substr(-1 * (ext.length + 1)) === `.${ext}`) {
        const dimensions = sizeOf(newbase);

        result.push({
          file: newbase.replace('public', ''),
          width: dimensions.width,
          height: dimensions.height,
          location: file.split('_')[0]
        });
      }
    });
    return result;
  };

  const images = recFindByExt('public/static/images/travel', 'jpg');
  return {
    props: {
      images
    }
  };
}

export default Photos;
