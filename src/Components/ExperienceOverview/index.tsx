import React from "react";
import Divider from "Components/Divider";
import styled from "styled-components";

const Container = styled.div`
  padding-top: 50px;
`;

// const Selector = () => {
//     return (
//         <ul>

//         </ul>
//     )
// }

export default function ExperienceOverview() {
  return (
    <Container>
      <Divider />
      <h2>Experiences</h2>
    </Container>
  );
}
