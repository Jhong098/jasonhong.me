import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import "./About.scss";
import { media } from "breakpoints";
import { theme } from "styles";
import { StyledLink } from "Components/Button";
import { email } from "copy";

const { fontSizes, spaces, colors, fonts } = theme;

const AnimatedTextContainer = styled.div`
  overflow: hidden;

  h1 {
    color: ${colors.white};
    font-size: 60px;
    ${media.tablet`font-size: ${fontSizes.h3}`}
  }

  h2 {
    font-size: 50px;
    ${media.tablet`font-size: ${fontSizes.xxl}`}
  }

  .highlight {
    color: ${colors.neonBlue};
    margin-bottom: ${spaces.md};
  }

  .serif {
    font-family: ${fonts.serif};
  }
`;

const ButtonContainer = styled(motion.div)`
  width: 100px;
  margin-top: ${spaces.md};
`;

const transition = {
  ease: "easeInOut",
  duration: 0.6
};

const About = () => {
  return (
    <div id="about">
      <AnimatedTextContainer>
        <motion.p
          animate={{ y: [35, 0] }}
          transition={transition}
          className="serif"
        >
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

      <AnimatedTextContainer>
        <motion.p
          animate={{ y: [35, 0] }}
          transition={transition}
          className="highlight"
        >
          Currently looking for Fall 2020 Software Internship!
        </motion.p>
      </AnimatedTextContainer>

      <ButtonContainer
        whileHover={{ y: -5 }}
        animate={{ opacity: [0, 1], y: [35, 0] }}
      >
        <StyledLink href={`mailto:${email}`}>Say Hi</StyledLink>
      </ButtonContainer>
    </div>
  );
};

export default About;
