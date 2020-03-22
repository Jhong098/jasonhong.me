import React, { useState, useEffect, useRef } from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";
import { landing } from "../../copy";
import About from "Pages/About";
import { motion, useViewportScroll } from "framer-motion";
import { PRIMARY_HIGHLIGHT } from "const";
import BG from "Components/BG";
import { useIntersection } from "react-use";
import { arrow, circle } from "static";

const transition = { duration: 1.5, ease: "easeInOut" };

const textStages = {
  hidden: { left: "40vw", transition },
  expanded: { left: "100vw", transition }
};

const introStages = {
  hidden: { left: "-100vw", transition },
  expanded: { left: "40vw", transition }
};

const EXPAND_THRESHOLD = 50;
const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;

const Landing = () => {
  const experienceRef = useRef(null);
  const introRef = useRef<HTMLDivElement>(null);
  const isIntersectingExperience = useIntersection(experienceRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  });

  const { scrollY } = useViewportScroll();
  const [redirect, setRedirect] = useState("");
  const [isScrolled, setIsScrolled] = useState(scrollY.get() > 0);

  console.log(isIntersectingExperience);

  useEffect(
    () =>
      scrollY.onChange(latest => {
        setIsScrolled(latest >= EXPAND_THRESHOLD);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div id="landing">
      <About />
      {/* <div style={{ padding: 70, width: "100%" }} ref={introRef}>
        <motion.div
          style={{
            overflow: "hidden",
            position: "relative",
            zIndex: 1
          }}
        >
          <motion.h1 style={{ fontSize: "90px" }} animate={{ y: [50, 0] }}>
            WELCOME, I'm Jason.
          </motion.h1>
        </motion.div>
        <div className="hero-subtitle">
          <img src={arrow} alt="arrow" />
          <ul>
            <li>Developer</li>
            <li>Student</li>
            <li>Traveller</li>
          </ul>
        </div>

        <div className="highlight">
          <img src={circle} alt="circle" />
        </div> */}

      {/* <motion.div
          style={{
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            maxWidth: "45%"
          }}
        >
          <motion.p animate={{ y: [-50, 0] }}>
            I'm a third-year Computer Engineering student who is passionate
            about creating things with technology.
          </motion.p>
          // {/* <About />
        </motion.div> */}
      {/* </div> */}
      {/* 
      {introRef && introRef.current && (
        <BG
          color={PRIMARY_HIGHLIGHT}
          startWidth={0}
          startHeight={0}
          endHeight={introRef.current.offsetHeight}
          endWidth={introRef.current.offsetWidth}
          stage={isScrolled ? "expanded" : "hidden"}
        />
      )} */}

      <div className="page section" ref={experienceRef}>
        <div className="content content--center">
          {landing.sections.map(({ header, image, text, redirect }, index) => (
            <SectionImage
              image={image}
              titleText={header}
              description={text}
              key={header}
              onClick={() => setRedirect(redirect)}
            />
          ))}
        </div>
      </div>
      {landing.sections
        .filter(({ redirect: r }) => redirect === r)
        .map(({ redirect: path }) => (
          <Redirect key={path} to={`/${path}`} />
        ))}
    </div>
  );
};

export default Landing;
