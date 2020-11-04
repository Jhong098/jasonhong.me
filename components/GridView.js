import styled from '@emotion/styled';
import { useState } from 'react';

import LightBox from 'components/LightBox';

import Image from 'next/image';

const GridContainer = styled.div`
  max-width: 850px;
  padding: 2rem 1rem 0;
  columns: 3 200px;
  column-gap: 1rem;

  div {
    width: 150px;
    color: white;
    margin: 0 1rem 1rem 0;
    display: inline-block;
    width: 100%;
  }
  @for $i from 1 through 36 {
    div:nth-of-type(#{$i}) {
      $h: (random(400) + 100) + px;
      height: $h;
      line-height: $h;
    }
  }
`;

const StyledImage = styled(Image)`
  cursor: pointer;
  &:hover {
    filter: grayscale(100%) contrast(1) brightness(90%);
  }
`;

const GridView = ({ images, handleLightBoxToggle }) => {
  const [openImage, setOpenImage] = useState();

  return (
    <>
      {openImage && (
        <LightBox
          image={openImage}
          handleClose={() => {
            setOpenImage(null);
            handleLightBoxToggle();
          }}
        />
      )}
      <GridContainer>
        {/* {!imagesLoaded && <Loader />} */}
        {images.map(({ file, width, height }) => (
          <StyledImage
            key={file}
            src={file}
            alt={file}
            width={width}
            height={height}
            priority
            onClick={() => {
              setOpenImage({ file, width, height });
              handleLightBoxToggle();
            }}
          />
        ))}
      </GridContainer>
    </>
  );
};

export default GridView;
