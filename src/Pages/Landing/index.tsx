import React, { useState } from "react";
import "./Landing.scss";
import About from "Pages/About";
import Background from "Components/Background";
// import RotateText from "Components/RotateText";
import Highlights from "./highlights";
import Footer from "Components/Footer";
import SectionImage from "Components/SectionImage";
import { landing } from "copy";

const Landing = () => {
  return (
    <>
      <main>
        <Background />
        <div className="page">
          <div className="content content--center">
            <About />
            <Highlights />
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Landing;
