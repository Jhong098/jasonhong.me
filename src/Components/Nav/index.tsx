import React, { useState } from "react";
import styled from "styled-components";
import Logo from "Components/Logo";
import useScroll from "utils/useScroll";
import { theme } from "styles";
import { useMediaQuery } from "react-responsive";
import NavLinks from "Components/NavLinks";
import Hamburger from "Components/Hamburger";
import Drawer from "Components/Drawer";
import { sizes, media } from "breakpoints";

const { colors, spaces } = theme;

const MIN_DELTA = 30;
const TIMEOUT_DELAY = 200;

const Container = styled.header<{ scrollDir: string | null }>`
  position: fixed;
  align-items: center;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  padding: 0px ${spaces.xl};
  background-color: ${colors.darkNavy};
  transition: ${theme.transition};
  z-index: 11;
  width: 100%;
  height: ${theme.navHeight};
  transform: translateY(
    ${props => (props.scrollDir === "down" ? `-${theme.navHeight}` : "0px")}
  );
  ${media.desktop`padding: 0 ${spaces.lg};`};
  ${media.tablet`padding: 0 ${spaces.md};`};
`;

const SectionContainer = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Nav = () => {
  const isMobile = useMediaQuery({ maxWidth: sizes.phablet });
  const [scrollDir, setScrollDir] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useScroll(({ previousScrollTop, currentScrollTop }) => {
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isPastDelta = currentScrollTop > MIN_DELTA;
    setTimeout(() => {
      setScrollDir(isPastDelta && isScrolledDown ? "down" : "up");
    }, TIMEOUT_DELAY);
  });

  return (
    <Container scrollDir={scrollDir}>
      <Logo />
      <SectionContainer>
        {isMobile ? (
          <Hamburger
            isOpen={isDrawerOpen}
            toggle={() => setIsDrawerOpen(!isDrawerOpen)}
          />
        ) : (
          <NavLinks />
        )}
      </SectionContainer>
      {isMobile && (
        <Drawer
          isOpen={isDrawerOpen}
          toggle={() => setIsDrawerOpen(!isDrawerOpen)}
        />
      )}
    </Container>
  );
};

export default Nav;
