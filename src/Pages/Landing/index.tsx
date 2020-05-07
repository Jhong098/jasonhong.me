import React, { useEffect } from "react";
import "./Landing.scss";
import About from "Pages/About"; // import RotateText from "Components/RotateText";
// import Highlights from "./highlights";
import Footer from "Components/Footer";
import SectionImage from "Components/SectionImage";
import { landing } from "copy";
import ExperienceOverview from "Components/ExperienceOverview";
import styled from "styled-components";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { media } from "breakpoints";

const Container = styled.div`
  padding: 0 15vw;
`;

const Landing = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    console.log(inView);
    if (inView) {
      controls.start({ opacity: [0, 1], y: [50, 0] });
    }
  }, [controls, inView]);

  return (
    <>
      <main>
        <Container className="page">
          <div className="content content--center">
            <About />
            <motion.div ref={ref} animate={controls}>
              <ExperienceOverview />
            </motion.div>

            <div className="sections">
              {landing.sections.map(({ images, redirect, header, text }) => (
                <SectionImage
                  image={images[0]}
                  titleText={header}
                  key={header}
                  redirect={redirect}
                />
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
