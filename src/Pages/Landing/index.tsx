import React, { useState } from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";
import { landing } from "../../copy";
import Footer from "Components/Footer";
import About from "Pages/About";
// import Balls from "Components/Balls";

const Landing = () => {
  // const redirect = to => {
  //   this.setState(() => ({
  //     redirectTo: to
  //   }));
  // };

  const [redirect, setRedirect] = useState("");

  return (
    <>
      {/* <Balls /> */}
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

            <Footer />
          </div>
        </div>
      </main>
      {landing.sections
        .filter(({ redirect: r }) => redirect === r)
        .map(({ redirect: path }) => (
          <Redirect key={path} to={`/${path}`} />
        ))}
      {/* {redirect === "experience" && <Redirect to="/experience" />}
      {redirect === "experience" && <Redirect to="/experience" />} */}
    </>
  );
};

export default Landing;
