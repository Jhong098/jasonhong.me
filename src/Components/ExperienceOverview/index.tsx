import React, { useState } from "react";
import Divider from "Components/Divider";
import styled from "styled-components";
import { experiencesList } from "copy";

interface ItemProps {
  isSelected: boolean;
}

interface ItemOptionProps extends ItemProps {
  text: string;
  handleClick: any;
}

const Container = styled.div`
  padding-top: 50px;
`;

const Item = styled.li<ItemProps>`
  button {
    color: ${props => (props.isSelected ? "#64ffda" : "#a8b2d1")};
  }
`;

const ItemOption: React.FC<ItemOptionProps> = ({
  text,
  isSelected,
  handleClick
}) => {
  return (
    <Item isSelected={isSelected}>
      <button onClick={() => handleClick(text)}>{text}</button>
    </Item>
  );
};

const Selector: React.FC<{ selected: string; handleClick: any }> = ({
  selected,
  handleClick
}) => {
  console.log(selected);
  return (
    <ul>
      {experiencesList.map(({ title }) => (
        <ItemOption
          text={title}
          isSelected={selected === title}
          handleClick={handleClick}
        />
      ))}
    </ul>
  );
};

export default function ExperienceOverview() {
  const [selected, setSelected] = useState(experiencesList[0].title);

  return (
    <Container>
      <Divider />
      <h2>Experiences</h2>
      <div>
        <Selector
          selected={selected}
          handleClick={(text: string) => setSelected(text)}
        />
      </div>
    </Container>
  );
}
