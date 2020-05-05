import React, { memo } from "react";
import styled from "styled-components";

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #a8b2d1;
`;

const Divider = () => <Line />;

export default memo(Divider);
