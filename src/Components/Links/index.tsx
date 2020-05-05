import React from "react";
import { links } from "copy";
import styled from "styled-components";

const LinksContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 20px;
  display: flex;
  z-index: 5;
  flex-direction: column;

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

const Links = () => {
  return (
    <LinksContainer>
      {links.map(({ name, img, link }) => (
        <a href={link} target="_blank" rel="noopener noreferrer" key={name}>
          {img("link-icon")}
        </a>
      ))}
    </LinksContainer>
  );
};

export default Links;
