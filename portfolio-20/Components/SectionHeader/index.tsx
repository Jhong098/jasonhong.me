import React, { memo } from "react";
import styled from "styled-components";
import { theme } from "styles";

const Wrapper = styled.div`
  margin: ${theme.spaces.lg} 0;
`;

const SectionHeader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Wrapper>
      <h2>{text}</h2>
    </Wrapper>
  );
};

export default memo(SectionHeader);
