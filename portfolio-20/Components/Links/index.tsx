import React from "react";
import { links } from "copy";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme } from "styles";

interface NavLinksProps {
  isMobile?: boolean;
}

const LinksContainer = styled(motion.div)<NavLinksProps>`
  ${({ isMobile }) =>
    isMobile
      ? ""
      : `
    position: fixed;
    bottom: 0;
    left: 0;
    padding: ${theme.spaces.lg};
  `}
  display: flex;
  z-index: 5;
  flex-direction: ${({ isMobile }) => (isMobile ? "row" : "column")};

  a {
    margin: 10px;
  }

  .link-icon {
    color: #a8b2d1;
    &:hover {
      stroke: #64ffda;
    }
  }
`;

const Links: React.FC<NavLinksProps> = ({ isMobile = false }) => {
  return (
    <LinksContainer animate={{ opacity: [0, 1] }} isMobile={isMobile}>
      {links.map(({ name, img, link }) => (
        <motion.a
          whileHover={{ y: -3 }}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          key={name}
        >
          {img("link-icon")}
        </motion.a>
      ))}
    </LinksContainer>
  );
};

export default Links;
