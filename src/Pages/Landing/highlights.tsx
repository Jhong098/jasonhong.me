import React from "react";
// import Marquee from "Components/Marquee";
import ScrollCarousel from "Components/ScrollCarousel";
import { experiencesList } from "copy";
import SectionImage from "Components/SectionImage";
import styled from "styled-components";
// import { useInView } from "react-intersection-observer";

const Box = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 70rem;
  height: 100vh;
  margin: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Highlights = () => {
  return (
    <div id="highlights">
      {/* <Marquee text="HIGHLIGHTS" /> */}

      <ScrollCarousel>
        {experiencesList.map(({ img, title }, i) => (
          <Box key={title}>
            <SectionImage
              image={img}
              titleText={title}
              key={title}
              redirect={`experience/${i}`}
            />
          </Box>
        ))}
      </ScrollCarousel>
    </div>
  );
};

export default Highlights;
