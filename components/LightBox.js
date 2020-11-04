import { useRef } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { CloseButton } from '@chakra-ui/core';

import useOnClickOutside from 'utils/useClickOutside';
// import { media } from "breakpoints";
import useLockBodyScroll from 'utils/useLockBodyScroll';
// import Loader from "Components/Loader";
// import { motion } from "framer-motion";

const Container = styled.div`
  z-index: 21;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-height: 80%;
    max-width: 80%;
  }
`;

// const StyledImage = styled(Image)`
//   max-height: 80vh;
//   max-width: 80vw;
// `;

const CloseIcon = styled(CloseButton)`
  position: absolute;
  z-index: 22;
  top: 2rem;
  right: 2rem;
`;

const LightBox = ({ image, handleClose }) => {
  const ref = useRef();

  useOnClickOutside(ref, handleClose);
  useLockBodyScroll();

  return (
    <Container>
      <CloseIcon onClick={handleClose} size="lg" />
      {/* {!loaded && <Loader />} */}
      <div ref={ref} style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src={image.file}
          alt="lightbox-image"
          // onLoad={() => setLoaded(true)}
          width={image.width}
          height={image.height}
          // animate={{ opacity: loaded ? 1 : 0 }}
        />
      </div>
    </Container>
  );
};

export default LightBox;
