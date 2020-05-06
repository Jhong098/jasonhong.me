import React, { useState, useEffect } from "react";
import Divider from "Components/Divider";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { experiencesList } from "copy";
import { theme, mixins } from "styles";
import { sizes, media } from "breakpoints";
import SectionHeader from "Components/SectionHeader";

const { colors, fontSizes, transition } = theme;

interface ItemProps {
  isSelected: boolean;
}

interface ItemOptionProps extends ItemProps {
  index: number;
  text: string;
  handleClick: any;
}

const Container = styled.div`
  padding-top: 50px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  ${media.thone`
  display: block;
`};
`;

const ItemButton = styled.button<ItemProps>`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: transparent;
  height: ${theme.tabHeight}px;
  padding: 0 20px 2px;
  transition: ${theme.transition};
  border-left: 2px solid ${colors.lightestNavy};
  text-align: left;
  white-space: nowrap;
  font-size: ${fontSizes.sm};
  color: ${props => (props.isSelected ? colors.neonBlue : colors.lightGrey)};
  ${media.tablet`padding: 0 15px 2px;`};
  ${media.thone`
    padding: 0 15px;
    text-align: center;
    border-left: 0;
    border-bottom: 2px solid ${colors.lightestNavy};
    min-width: 120px;
  `};
  &:hover,
  &:focus {
    color: ${colors.neonBlue};
    background-color: ${colors.lightestNavy};
  }
`;

const StyledHighlight = styled.span<{ selectedIndex: number }>`
  display: block;
  background: ${colors.neonBlue};
  width: 2px;
  height: ${theme.tabHeight}px;
  border-radius: ${theme.borderRadius};
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;
  z-index: 10;
  transform: translateY(
    ${props =>
      props.selectedIndex > 0 ? props.selectedIndex * theme.tabHeight : 0}px
  );

  @media (max-width: ${sizes.thone}px) {
    width: 100%;
    max-width: ${theme.tabWidth}px;
    height: 2px;
    top: auto;
    bottom: 0;
    transform: translateX(
      ${props =>
        props.selectedIndex > 0 ? props.selectedIndex * theme.tabWidth : 0}px
    );
    margin-left: 50px;
  }

  ${media.phablet`
    margin-left: 25px;
  `};
`;

const StyledContent = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 12px;
  padding-left: 30px;
  ${media.tablet`padding-left: 20px;`};
  ${media.thone`padding-left: 0;`};
  a {
    ${mixins.inlineLink};
  }
  ul {
    ${mixins.fancyList};
  }
`;

const StyledJobTitle = styled.h4`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xxl};
  font-weight: 500;
  margin-bottom: 5px;

  :first-child {
    color: ${colors.white};
  }
`;
const StyledCompany = styled.span`
  color: ${colors.neonBlue};
`;
const StyledJobDetails = styled.h5`
  font-size: ${fontSizes.smish};
  font-weight: normal;
  letter-spacing: 0.05em;
  color: ${colors.lightGrey};
  margin-bottom: 30px;
  svg {
    width: 15px;
  }
`;

const ItemOption: React.FC<ItemOptionProps> = ({
  index,
  text,
  isSelected,
  handleClick
}) => {
  return (
    <li>
      <ItemButton isSelected={isSelected} onClick={() => handleClick(index)}>
        {text}
      </ItemButton>
    </li>
  );
};

const Selector: React.FC<{ handleClick: any; selectedIndex: number }> = ({
  handleClick,
  selectedIndex
}) => {
  return (
    <ul style={{ padding: 0, margin: 0 }}>
      {experiencesList.map(({ title }, i) => (
        <ItemOption
          key={title}
          index={i}
          text={title}
          isSelected={selectedIndex === i}
          handleClick={handleClick}
        />
      ))}
      <StyledHighlight selectedIndex={selectedIndex} />
    </ul>
  );
};

const Content: React.FC<{ selectedIndex: number }> = ({ selectedIndex }) => {
  const { title, role, location, time, details, link } = experiencesList[
    selectedIndex
  ];
  return (
    <StyledContent>
      <StyledJobTitle>
        <span>{role}</span>
        <StyledCompany>
          <span>&nbsp;@&nbsp;</span>
          <a href={link} target="_blank" rel="nofollow noopener noreferrer">
            {title}
          </a>
        </StyledCompany>
      </StyledJobTitle>
      <StyledJobDetails>
        <span>{time}</span> - <span>{location}</span>
      </StyledJobDetails>
      <ul>
        {details.map((text: string) => (
          <li>{text}</li>
        ))}
      </ul>
    </StyledContent>
  );
};

export default function ExperienceOverview() {
  const [selected, setSelected] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1]
    });
  }, [selected]);

  return (
    <Container id="experiences">
      <SectionHeader text="Experiences" />
      <FlexContainer>
        <Selector
          selectedIndex={selected}
          handleClick={(id: number) => setSelected(id)}
        />
        <motion.div animate={controls}>
          <Content selectedIndex={selected} />
        </motion.div>
      </FlexContainer>
    </Container>
  );
}
