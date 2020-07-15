import React, { Suspense, lazy } from "react";
import "./Landing.scss";
import About from "Sections/About";
import Footer from "Components/Footer";

import Experience from "Sections/Experience";
import styled from "styled-components";

import Nav from "Components/Nav";
import Links from "Components/Links";
import { useMediaQuery } from "react-responsive";
import { sizes } from "breakpoints";
import Loader from "Components/Loader";

const Container = styled.div`
  padding: 0 15vw;
`;

const Projects = lazy(() => import("Sections/Projects"));
const Hobbies = lazy(() => import("Sections/Hobbies"));

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
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
          <Suspense fallback={null}>
            <Hobbies />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
