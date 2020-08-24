import Head from "next/head";
import dynamic from "next/dynamic";
// import "./Landing.scss";

import Footer from "Components/Footer";
import About from "Sections/About";
import Experience from "Sections/Experience";
import styled from "styled-components";

import Nav from "Components/Nav";
import Links from "Components/Links";
import { useMediaQuery } from "react-responsive";
import { sizes } from "breakpoints";

const Container = styled.div`
  padding: 0 15vw;
`;

const Projects = dynamic(() => import("Sections/Projects"));
const Hobbies = dynamic(() => import("Sections/Hobbies"));

const Landing = () => {
  const isMobile = useMediaQuery({ maxWidth: sizes.phablet });
  return (
    <>
      <Head>
        <title>Jason Hong | Software Developer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
