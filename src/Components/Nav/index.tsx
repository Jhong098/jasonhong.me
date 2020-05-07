import React, { useState } from "react";
import styled from "styled-components";
import Logo from "Components/Logo";
import useScroll from "utils/useScroll";
import { theme } from "styles";

const { colors, fontSizes } = theme;

const MIN_DELTA = 60;
const TIMEOUT_DELAY = 200;

const Container = styled.header<{ scrollDir: string | null }>`
  position: fixed;
  align-items: center;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  padding: 0px 50px;
  background-color: ${colors.darkNavy};
  transition: ${theme.transition};
  z-index: 11;
  width: 100%;
  height: ${theme.navHeight};
  transform: translateY(
    ${props => (props.scrollDir === "down" ? `-${theme.navHeight}` : "0px")}
  );
`;

const SectionContainer = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Section = styled.li`
  margin: 0 10px;
  position: relative;
  font-size: ${fontSizes.smish};
  counter-increment: item 1;
  &:before {
    content: "0" counter(item) ".";
    text-align: right;
    color: ${colors.neonBlue};
    font-size: ${fontSizes.xs};
  }
`;

const Nav = () => {
  const [scrollDir, setScrollDir] = useState<string | null>(null);

  useScroll(({ previousScrollTop, currentScrollTop }) => {
    console.log(previousScrollTop);
    console.log(currentScrollTop);
    const isScrolledDown = previousScrollTop < currentScrollTop;
    const isPastDelta = currentScrollTop > MIN_DELTA;
    setTimeout(() => {
      setScrollDir(isPastDelta && isScrolledDown ? "down" : "up");
    }, TIMEOUT_DELAY);
  });

  console.log(scrollDir);

  return (
    <Container scrollDir={scrollDir}>
      <Logo />
      <SectionContainer>
        <Section>experience</Section>
        <Section>projects</Section>
        <Section>hobbies</Section>
        <Section>contact</Section>
      </SectionContainer>
    </Container>
  );
};

export default Nav;
