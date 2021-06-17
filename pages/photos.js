/* eslint-disable no-param-reassign */
import path from 'path';
import fs from 'fs';
import sizeOf from 'image-size';
import PageWrapper from 'components/PageWrapper';
import Gallery from 'components/Gallery';

const Photos = ({ images }) => {
  return (
    <PageWrapper>
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
