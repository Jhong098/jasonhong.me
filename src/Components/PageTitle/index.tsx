import React, { memo } from "react";
import styled from "styled-components";
import { SECONDARY_DARK } from "const";

interface PageTitleProps {
  title: string;
  desc: string;
  img: string;
  index: number;
}

const PageTitleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
`;

const Title = styled.h2`
  font-size: 50px;
`;

const SubTitle = styled.h3`
  font-size: 50px;
  color: ${SECONDARY_DARK};
  grid-column: 2 / span 2;
`;

const Number = styled.p`
  font-size: 50px;
  color: transparent;
  -webkit-text-stroke-color: ${SECONDARY_DARK};
  -webkit-text-stroke-width: 1px;
`;

const PageTitle: React.FC<PageTitleProps> = ({ title, desc, img, index }) => {
  return (
    <PageTitleContainer>
      <Title>{title}</Title>
      <SubTitle>{desc}</SubTitle>
      <Number>{index}</Number>
    </PageTitleContainer>
  );
};

export default memo(PageTitle);
