import React, { useState } from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";
import { landing } from "../../copy";
import About from "Pages/About";

const Landing = () => {
  const [redirect, setRedirect] = useState("");

  return (
    <>
      <main>
        <div className="page">
          <div className="content content--center">
            <About />

            {landing.sections.map(
              ({ header, image, text, redirect }, index) => (
                <SectionImage
                  image={image}
                  titleText={header}
                  description={text}
                  key={header}
                  onClick={() => setRedirect(redirect)}
                />
              )
            )}
          </div>
        </div>
      </main>
      {landing.sections
        .filter(({ redirect: r }) => redirect === r)
        .map(({ redirect: path }) => (
          <Redirect key={path} to={`/${path}`} />
        ))}
    </>
  );
};

export default Landing;
