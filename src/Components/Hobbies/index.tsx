import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { mixins, theme } from "styles";
import SectionHeader from "Components/SectionHeader";
import { motion } from "framer-motion";
import { landing } from "copy";
import { media } from "breakpoints";
import { Link } from "react-router-dom";
import sr, { srConfig } from "utils/scrollReveal";
const { colors, spaces } = theme;

const Container = styled.div`
  ${mixins.sectionPadding}
`;

const StyledFeaturedImg = styled(motion.img)`
  width: 100%;
  max-width: 100%;
  vertical-align: middle;
  border-radius: ${theme.borderRadius}px;
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1) brightness(90%);
  object-fit: cover;
  height: 500px;
  ${media.tablet`
    object-fit: cover;
    width: auto;
    height: 100%;
    filter: grayscale(100%) contrast(1) brightness(80%);
  `};
`;

const StyledImgContainer = styled(Link)`
  ${mixins.boxShadow};
  position: relative;
  z-index: 1;
  background-color: ${colors.neonBlue};
  border-radius: ${theme.borderRadius + 1}px;
  transition: ${theme.transition};
  ${media.tablet`height: 100%;`};
  ${media.thone`
    opacity: 0.25;
  `};
  overflow: hidden;
  &:hover,
  &:focus {
    background: transparent;
    &:before,
    ${StyledFeaturedImg} {
      background: transparent;
      filter: none;
      transform: scale(1.2);
    }
  }
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    transition: ${theme.transition};
    background-color: ${colors.darkNavy};
    mix-blend-mode: screen;
  }
`;

const Grid = styled.div`
  margin-top: ${spaces.lg};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: ${spaces.md};
  position: relative;
  ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));`};
`;

const TextContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: ${spaces.md};
  top: 0;
  left: 0;
  ${mixins.flexCenter}
  flex-direction: column;
  color: ${colors.white};
`;

const Hobbies = () => {
  const revealHeader = useRef<HTMLDivElement | null>(null);
  const revealHobbies = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (revealHeader.current) {
      sr?.reveal(revealHeader.current, srConfig());
    }

    revealHobbies.current.forEach((ref, i) => {
      if (ref) {
        sr?.reveal(ref, srConfig(i * 100));
      }
    });
  }, []);

  return (
    <Container>
      <div ref={revealHeader}>
        <SectionHeader text="Hobbies" />
      </div>

      <Grid>
        {landing.sections.map(({ images, redirect, header, text }) => (
          <StyledImgContainer
            to={redirect}
            ref={el => revealHobbies.current.push(el)}
          >
            <StyledFeaturedImg src={images[0]} alt={header} />
            <TextContainer>
              <h1>{header}</h1>
              <h5>{text}</h5>
            </TextContainer>
          </StyledImgContainer>
        ))}
      </Grid>
    </Container>
  );
};

export default Hobbies;
