import React, { memo } from "react";
import { LoadingSVG } from "public";
import styled from "styled-components";

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50px, -50px);
  height: 100px;
  text-align: center;
  padding: 1em;
  margin: 0 auto 1em;
  width: 100px;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LoadingSVG />
    </LoaderContainer>
  );
};

export default memo(Loader);
