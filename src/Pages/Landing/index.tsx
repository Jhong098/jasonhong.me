import React from "react";
import "./Landing.scss";
import About from "Pages/About"; // import RotateText from "Components/RotateText";
import Footer from "Components/Footer";

import ExperienceOverview from "Components/ExperienceOverview";
import styled from "styled-components";
import Projects from "Components/Projects";
import Hobbies from "Components/Hobbies";
import Nav from "Components/Nav";
import Links from "Components/Links";
import { useMediaQuery } from "react-responsive";
import { sizes } from "breakpoints";

const Container = styled.div`
  padding: 0 15vw;
`;

const Landing = () => {
  const isMobile = useMediaQuery({ maxWidth: sizes.phablet });
  return (
    <>
      <Nav />
      {!isMobile && <Links />}
      <main>
        <Container className="page">
          <About />
          <ExperienceOverview />
          <Projects />
          <Hobbies />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
