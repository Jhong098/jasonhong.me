import React, { useState, useEffect } from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";
import { landing } from "../../copy";
import About from "Pages/About";
import { motion, useViewportScroll } from "framer-motion";
import { PRIMARY_HIGHLIGHT } from "const";

const transition = { duration: 1.5, ease: "easeInOut" };

const bgStages = {
  hidden: { width: "50%", transition },
  expanded: { width: "100%", transition }
};

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

const Landing = () => {
  const { scrollY } = useViewportScroll();
  const [redirect, setRedirect] = useState("");
  const [isScrolled, setIsScrolled] = useState(scrollY.get() > 0);

  useEffect(
    () =>
      scrollY.onChange(latest => {
        console.log("changed");
        console.log(latest);
        setIsScrolled(latest >= EXPAND_THRESHOLD);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <motion.div
        style={{
          backgroundColor: PRIMARY_HIGHLIGHT,
          height: WINDOW_HEIGHT - 80,
          position: "fixed",
          zIndex: 0
        }}
        initial="hidden"
        animate={isScrolled ? "expanded" : "hidden"}
        exit="hidden"
        variants={bgStages}
      ></motion.div>
      <div style={{ padding: 70 }}>
        <motion.div
          style={{
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
            marginBottom: 20
          }}
        >
          <motion.h1 style={{ fontSize: "70px" }} animate={{ y: [50, 0] }}>
            WELCOME, I'm Jason.
          </motion.h1>
        </motion.div>
        <motion.div
          style={{
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            maxWidth: "45%"
          }}
        >
          <motion.h1 animate={{ y: [-50, 0] }}>
            I'm a third-year Computer Engineering student who is passionate
            about creating things with technology.
          </motion.h1>
          {/* <About /> */}
        </motion.div>
      </div>

      <div className="page">
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
