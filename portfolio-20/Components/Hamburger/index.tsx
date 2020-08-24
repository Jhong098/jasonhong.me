import React from "react";
import styled from "styled-components";
import { theme, mixins } from "styles";
import { media } from "breakpoints";
const { colors } = theme;

interface HamburgerState {
  isOpen: boolean;
}

interface HamburgerProps extends HamburgerState {
  toggle: () => void;
}

const StyledHamburger = styled.div`
  ${mixins.flexCenter};
  overflow: visible;
  margin: 0 -12px 0 0;
  padding: 15px;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
  display: none;
  z-index: 15;
  ${media.tablet`display: flex;`};
`;
const StyledHamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: ${theme.hamburgerWidth}px;
  height: 24px;
`;
const StyledHamburgerInner = styled.div<HamburgerState>`
  background-color: ${colors.neonBlue};
  position: absolute;
  width: ${theme.hamburgerWidth}px;
  height: 2px;
  border-radius: ${theme.borderRadius};
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${props => (props.isOpen ? `0.12s` : `0s`)};
  transform: rotate(${props => (props.isOpen ? `225deg` : `0deg`)});
  transition-timing-function: cubic-bezier(
    ${props =>
      props.isOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`}
  );
  &:before,
  &:after {
    content: "";
    display: block;
    background-color: ${colors.neonBlue};
    position: absolute;
    left: auto;
    right: 0;
    width: ${theme.hamburgerWidth}px;
    height: 2px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
  }
  &:before {
    width: ${props => (props.isOpen ? `100%` : `120%`)};
    top: ${props => (props.isOpen ? `0` : `-10px`)};
    opacity: ${props => (props.isOpen ? 0 : 1)};
    transition: ${props =>
      props.isOpen ? theme.hamBeforeActive : theme.hamBefore};
  }
  &:after {
    width: ${props => (props.isOpen ? `100%` : `80%`)};
    bottom: ${props => (props.isOpen ? `0` : `-10px`)};
    transform: rotate(${props => (props.isOpen ? `-90deg` : `0`)});
    transition: ${props =>
      props.isOpen ? theme.hamAfterActive : theme.hamAfter};
  }
`;

const Hamburger: React.FC<HamburgerProps> = ({ isOpen, toggle }) => {
  return (
    <StyledHamburger onClick={toggle}>
      <StyledHamburgerBox>
        <StyledHamburgerInner isOpen={isOpen} />
      </StyledHamburgerBox>
    </StyledHamburger>
  );
};

export default Hamburger;
