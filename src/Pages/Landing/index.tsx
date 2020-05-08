import React from "react";
import "./Landing.scss";
import About from "Sections/About";
import Footer from "Components/Footer";

import Experience from "Sections/Experience";
import styled from "styled-components";
import Projects from "Sections/Projects";
import Hobbies from "Sections/Hobbies";
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
          <Experience />
          <Projects />
          <Hobbies />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
