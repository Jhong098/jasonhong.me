import { useState } from 'react';
import styled from '@emotion/styled';
import GridView from './GridView';
// import Cards from "Components/Cards";

const Container = styled.div`
  display: flex;
  justify-content: center;
  &:after {
    content: '';
    z-index: 20;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: all 0.5s;
    pointer-events: none;
  }
`;

const Gallery = ({ images }) => {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  return (
    <Container isOpen={isLightBoxOpen}>
      <GridView
        images={images}
        handleLightBoxToggle={() => setIsLightBoxOpen(!isLightBoxOpen)}
      />
    </Container>
  );
};

export default Gallery;
