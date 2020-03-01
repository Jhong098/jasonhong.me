import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 auto;
  max-width: 950px;
  padding: 100px 0;
  width: 100%;
  position: relative;
`;

const PageContainer: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageContainer;
