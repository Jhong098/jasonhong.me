import React, { useEffect } from "react";
import styled from "styled-components";

import { initCursor, initCanvas, initHovers } from "Components/Cursor/utils";

const common = `
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
`;

const Inside = styled.div`
  ${common}
  width: 7px;
  height: 7px;
  left: -3.5px;
  top: -3.5px;
  border-radius: 50%;
  z-index: 11000;
  background: #000;
`;

const Outside = styled.canvas`
  ${common}
  width: 100vw;
  height: 100vh;
  z-index: 12000;
`;

const Cursor = () => {
  useEffect(() => {
    const innerCursor = document.querySelector(".cursor--inside");
    const canvas = document.querySelector(".cursor--outside");
    initCursor(innerCursor);
    initCanvas(canvas);
    initHovers();
  }, []);

  return (
    <>
      <Inside className="cursor--inside" />
      <Outside className="cursor--outside" />
    </>
  );
};

export default Cursor;
