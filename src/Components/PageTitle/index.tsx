import React, { memo } from "react";
import styled from "styled-components";

interface PageTitleProps {
  title: string;
  desc: string;
  img: string;
}

const PageTitleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
`;

const Title = styled.h2``;

const PageTitle: React.FC<PageTitleProps> = ({ title, desc, img }) => {
  return (
    <PageTitleContainer>
      <Title>{title}</Title>
    </PageTitleContainer>
  );
};

export default memo(PageTitle);
