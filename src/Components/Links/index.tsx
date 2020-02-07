import React from "react";
import { links } from "copy";
import styled from "styled-components";
import { motion } from "framer-motion";

const LinksContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 20px;
  margin: 10px;
  display: flex;
  z-index: 5;

  a {
    margin: 10px;
  }

  img {
    -webkit-backface-visibility: hidden;
  }
`;

const Links = () => {
  return (
    <LinksContainer>
      {links.map(({ name, img, link }) => (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          key={name}
        >
          <motion.img whileHover={{ scale: 1.1 }} src={img} alt={name} />
        </motion.a>
      ))}
    </LinksContainer>
  );
};

export default Links;
