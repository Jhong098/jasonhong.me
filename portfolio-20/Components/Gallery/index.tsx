import React, { useState } from "react";
import { LeftArrow, Grid, Cards as CardsIcon } from "public";
import { theme } from "styles";
import styled from "styled-components";
import { Link } from "react-router-dom";
import GridView from "./GridView";
import Cards from "Components/Cards";
import { ImageType } from "utils/types";

const { colors, spaces } = theme;

interface GalleryProps {
  images: ImageType[];
  id: string;
}

interface LightBoxState {
  isOpen: boolean;
}

const BackButton = styled(Link)`
  position: absolute;
  left: ${spaces.md};
  top: ${spaces.md};
  cursor: pointer;
  z-index: 19;
  display: flex;
  align-items: center;

  > * {
    margin: 0 5px;
  }

  &:hover {
    color: ${colors.neonBlue};
  }
`;

const ViewToggle = styled.button`
  position: absolute;
  right: ${spaces.md};
  top: ${spaces.md};
  cursor: pointer;
  z-index: 19;
  color: ${colors.lightGrey};

  &:hover {
    color: ${colors.neonBlue};
  }
`;

const Container = styled.div<LightBoxState>`
  &:after {
    content: "";
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

const Gallery: React.FC<GalleryProps> = ({ images, id }) => {
  const [isCardView, setIsCard] = useState(false);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  return (
    <Container id={id} isOpen={isLightBoxOpen}>
      <BackButton to="/">
        <LeftArrow />
        Back
      </BackButton>
      <ViewToggle onClick={() => setIsCard(!isCardView)}>
        {isCardView ? <Grid /> : <CardsIcon />}
      </ViewToggle>
      {isCardView ? (
        <Cards images={images} />
      ) : (
        <GridView
          images={images}
          handleLightBoxToggle={() => setIsLightBoxOpen(!isLightBoxOpen)}
        />
      )}
    </Container>
  );
};

export default Gallery;
