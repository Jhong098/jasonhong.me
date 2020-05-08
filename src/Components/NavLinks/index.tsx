import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { StyledLink } from "Components/Button";
import { Resume } from "static";
import { theme } from "styles";
import { navLinks } from "copy";

const { colors, fontSizes } = theme;

interface NavLinksProps {
  isMobile?: boolean;
}

const Section = styled.li<NavLinksProps>`
  margin: ${({ isMobile }) => (isMobile ? "0 auto 40px" : "0 10px")};
  position: relative;
  font-size: ${({ isMobile }) => (isMobile ? fontSizes.lg : fontSizes.md)};

  a {
    padding: ${({ isMobile }) => (isMobile ? "8px 10px" : "8px 10px")};
    cursor: pointer;
    &:hover {
      color: ${colors.neonBlue};
    }
  }
`;

const NavLinks: React.FC<NavLinksProps> = ({ isMobile = false }) => {
  return (
    <>
      {navLinks.map(link => (
        <Section isMobile={isMobile}>
          <Link to={link} smooth={true}>
            {link}
          </Link>
        </Section>
      ))}
      <Section isMobile={isMobile}>
        <StyledLink
          href={Resume}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          resume
        </StyledLink>
      </Section>
    </>
  );
};

export default NavLinks;
