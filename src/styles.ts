import { css } from "styled-components";
import { media } from "breakpoints";

const theme = {
  colors: {
    darkNavy: "#0a192f",
    lightestNavy: "#303C55",
    beige: "#b1a59f",
    darkGrey: "#333",
    lightGrey: "#a8b2d1",
    neonBlue: "#64ffda",
    white: "#e6f1ff"
  },
  transition: "all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)",
  easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  spaces: {
    sm: "10px",
    md: "20px",
    lg: "40px"
  },
  tabHeight: 42,
  tabWidth: 120,
  borderRadius: 3,
  fontSizes: {
    xs: "12px",
    smish: "13px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "22px",
    h3: "32px"
  },
  navHeight: "100px",
  navScrollHeight: "70px"
};

const mixins = {
  sectionPadding: css`
    padding-top: 200px;
    padding-bottom: 200px;
    ${media.desktop`
      padding-top: 200px;
      padding-bottom: 200px;
    `};
    ${media.tablet`
      padding-top: 150px;
      padding-bottom: 150px;
    `};
    ${media.phablet`
      padding-top: 125px;
      padding-bottom: 125px;
    `};
  `,
  inlineLink: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    position: relative;
    transition: ${theme.transition};
    cursor: pointer;
    color: ${theme.colors.neonBlue};
    &:hover,
    &:focus,
    &:active {
      color: ${theme.colors.neonBlue};
      outline: 0;
      &:after {
        width: 100%;
      }
      & > * {
        color: ${theme.colors.neonBlue} !important;
        transition: ${theme.transition};
      }
    }
    &:after {
      content: "";
      display: block;
      width: 0;
      height: 1px;
      position: relative;
      background-color: ${theme.colors.neonBlue};
      transition: ${theme.transition};
      opacity: 0.5;
    }
  `,
  fancyList: css`
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: ${theme.fontSizes.lg};
    li {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      line-height: 1.25;
      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: ${theme.colors.neonBlue};
      }
    }
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  boxShadow: css`
    box-shadow: 0 10px 30px -15px ${theme.colors.darkNavy};
    transition: ${theme.transition};
    &:hover,
    &:focus {
      box-shadow: 0 20px 30px -15px ${theme.colors.darkNavy};
    }
  `
};

export { theme, mixins };
