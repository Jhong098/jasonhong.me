import React, { useEffect, useState } from "react";
import "./Landing.scss";
import { Art, Me, Temple } from "static/img";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";

const Landing = () => {
  const [redirectTo, setRedirectTo] = useState("");
  return (
    <>
      <main>
        <div data-scroll className="page">
          <div className="content content--center">
            <SectionImage
              image={Me}
              titleText="Me"
              description="about me."
              onClick={() => {
                setRedirectTo("about");
              }}
            />
            <SectionImage
              image={Art}
              titleText="Art"
              description="about my art."
              onClick={() => {}}
            />
            <SectionImage
              image={Temple}
              titleText="Travel"
              description="about my travels."
              onClick={() => {}}
            />
          </div>
        </div>
      </main>
      {redirectTo === "about" && <Redirect to="/about" />}
    </>
  );
};

export default Landing;
