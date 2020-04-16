import React, { useState } from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { landing, experiencesList } from "../../copy";
import About from "Pages/About";
import styled from "styled-components";
import ScrollCarousel from "Components/ScrollCarousel";
import Background from "Components/Background";
// import RotateText from "Components/RotateText";
import Marquee from "Components/Marquee";

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

const Landing = () => {
  return (
    <>
      <main>
        <Background />
        <Marquee text="showreel" />
        <div className="page">
          <div className="content content--center">
            <About />
            <ScrollCarousel>
              {experiencesList.map(({ img, title }, i) => (
                <Box>
                  <SectionImage
                    image={img}
                    titleText={title}
                    key={title}
                    redirect={`experience/${i}`}
                  />
                </Box>
              ))}
            </ScrollCarousel>
            {/* {landing.sections.map(
              ({ header, image, text, redirect }, index) => (
                <SectionImage
                  image={image}
                  titleText={header}
                  key={header}
                  onClick={() => setRedirect(redirect)}
                />
              )
            )} */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Landing;
