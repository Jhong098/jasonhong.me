/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import { theme, mixins } from "styles";
import { media } from "breakpoints";
import NavLinks from "Components/NavLinks";
import Links from "Components/Links";

const { colors } = theme;

interface DrawerState {
  isOpen: boolean;
}

interface DrawerProps extends DrawerState {
  toggle: () => void;
}

const Container = styled.div<DrawerState>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  outline: 0;
  transition: ${theme.transition};
  transform: translateX(${props => (props.isOpen ? 0 : 100)}vw);
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  display: none;
  ${media.tablet`display: block;`};
`;

const SideDrawer = styled.aside`
  ${mixins.flexCenter};
  flex-direction: column;
  background-color: ${colors.lightNavy};
  padding: 50px;
  width: 50vw;
  height: 100%;
  position: relative;
  right: 0;
  margin-left: auto;
  box-shadow: -10px 0px 30px -15px ${colors.shadow};
  ${media.thone`padding: 25px;`};
  ${media.phablet`width: 75vw;`};
  ${media.tiny`padding: 10px;`};
`;

const LinkContainer = styled.nav`
  ${mixins.flexBetween};
  width: 100%;
  flex-direction: column;
  text-align: center;
  color: ${colors.lightGrey};
`;

const NavList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;

const Drawer: React.FC<DrawerProps> = ({ isOpen, toggle }) => {
  return (
    <Container isOpen={isOpen} onClick={toggle} aria-hidden={!isOpen}>
      <SideDrawer>
        <LinkContainer>
          <NavList>
            <NavLinks isMobile handleClick={toggle} />
          </NavList>
        </LinkContainer>
        <Links isMobile />
      </SideDrawer>
    </Container>
  );
};

export default Drawer;
