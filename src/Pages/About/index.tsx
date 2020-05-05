import React, { useState, useEffect, useRef } from "react";
import { Me, Art, Temple } from "static";
import "./About.scss";

const About = () => {
  return (
    <div id="about">
      <p>Nice to meet you, my name is </p>
      <h1>Jason Hong.</h1>
      <h2>I build things with technology.</h2>
      <p>
        I'm a Computer Engineering student at the University of Waterloo. I like
        to travel, draw and take photos.
      </p>
    </div>
  );
};

export default About;
