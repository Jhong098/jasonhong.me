import React, { useState } from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";
import { landing } from "../../copy";
import Footer from "Components/Footer";
import About from "Pages/About";

const Landing = () => {
  // const redirect = to => {
  //   this.setState(() => ({
  //     redirectTo: to
  //   }));
  // };

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
      {redirect === "experience" && <Redirect to="/experience" />}
    </>
  );
};

export default Landing;
