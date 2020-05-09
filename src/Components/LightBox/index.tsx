/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from "react";
import styled from "styled-components";
import { Close } from "static";
import { theme } from "styles";
import useOnClickOutside from "utils/useClickOutside";
import { media } from "breakpoints";
import useLockBodyScroll from "utils/useLockBodyScroll";

const { spaces, colors } = theme;

interface LightBoxProps {
  image: string;
  handleClose: () => void;
}

const Container = styled.div`
  z-index: 21;
  position: fixed;
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-height: 80vh;
  max-width: 80vw;
`;

const CloseIcon = styled.button`
  position: absolute;
  z-index: 22;
  top: ${spaces.lg};
  right: ${spaces.lg};
  cursor: pointer;
  color: ${colors.white};

  ${media.phablet`
    bottom: ${spaces.md};
    left: 48%;
    top: unset;
  `}

  &:hover {
    color: ${colors.neonBlue};
  }
`;

const LightBox: React.FC<LightBoxProps> = ({ image, handleClose }) => {
  const ref = useRef<any>();

  useOnClickOutside(ref, handleClose);
  useLockBodyScroll();

  return (
    <Container>
      <CloseIcon onClick={handleClose}>
        <Close />
      </CloseIcon>
      <Image src={image} alt="lightbox-image" ref={ref} />
    </Container>
  );
};

export default LightBox;
