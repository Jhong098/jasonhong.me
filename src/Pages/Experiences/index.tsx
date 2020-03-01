import React, { useState } from "react";
import PageContainer from "Components/PageContainer";
import PageTitle from "Components/PageTitle";
import { experience } from "copy";

const Experiences = () => {
  const [index, setIndex] = useState(0);
  return (
    <div id="experiences">
      <PageContainer>
        <PageTitle {...experience[index]} />
      </PageContainer>
    </div>
  );
};

export default Experiences;
