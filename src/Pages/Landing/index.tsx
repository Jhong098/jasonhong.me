import React from "react";
import "./Landing.scss";
import About from "Pages/About"; // import RotateText from "Components/RotateText";
import Highlights from "./highlights";
import Footer from "Components/Footer";
import SectionImage from "Components/SectionImage";
import { landing } from "copy";
import ExperienceOverview from "Components/ExperienceOverview";

const Landing = () => {
  return (
    <>
      <main>
        <div className="page">
          <div className="content content--center">
            <About />
            <ExperienceOverview />
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
