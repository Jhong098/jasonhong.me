import React, { useState, useEffect, useRef } from "react";
import { Me, Art, Temple } from "static";
import { motion } from "framer-motion";
import styled from "styled-components";
import "./About.scss";

const AnimatedTextContainer = styled.div`
  overflow: hidden;
`;

const transition = {
  ease: "easeInOut",
  duration: 0.6
};

const About = () => {
  return (
    <div id="about">
      <AnimatedTextContainer>
        <motion.p animate={{ y: [35, 0] }} transition={transition}>
          Nice to meet you, my name is{" "}
        </motion.p>
      </AnimatedTextContainer>

      <AnimatedTextContainer>
        <motion.h1 animate={{ y: [70, 0] }} transition={transition}>
          Jason Hong.
        </motion.h1>
      </AnimatedTextContainer>

      <AnimatedTextContainer>
        <motion.h2 animate={{ y: [70, 0] }} transition={transition}>
          I build things with technology.
        </motion.h2>
      </AnimatedTextContainer>

      <AnimatedTextContainer>
        <motion.p animate={{ y: [35, 0] }} transition={transition}>
          I'm a Computer Engineering student at the University of Waterloo. I
          like to travel, draw and take photos.
        </motion.p>
      </AnimatedTextContainer>
    </div>
  );
};

export default About;
