/* eslint-disable no-param-reassign */
import path from 'path';
import fs from 'fs';
import sizeOf from 'image-size';

import PageWrapper from 'components/PageWrapper';
import Gallery from 'components/Gallery';
import { useState } from 'react';
import { Stack, Tag, TagIcon, TagLabel } from '@chakra-ui/core';

const TRAVEL_FILTERS = { All: true, HK: false, Taiwan: false, Japan: false, Vancouver: false };

const Photos = ({ images }) => {
  const [filters, setFilters] = useState(TRAVEL_FILTERS);
  return (
    <PageWrapper>
      <Stack spacing={4} isInline>
        {Object.entries(filters).map(([key, value]) => (
          <Tag size="lg" key={key} variantColor={value ? "cyan" : "gray"}>
            <TagIcon icon="add" size="12px" />
            <TagLabel>{key}</TagLabel>
          </Tag>
        ))}
      </Stack>
      <Gallery images={images} />
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
        });
      }
    });
    return result;
  };

  const images = recFindByExt('public/static/images/travel', 'jpg');
  return {
    props: {
      images,
    },
  };
}

export default Photos;
