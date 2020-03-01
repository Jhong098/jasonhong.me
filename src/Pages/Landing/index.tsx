import React from "react";
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
                  // onClick={() => redirect(redirect)}
                />
              )
            )}
          </div>
        </div>
      </main>
      {/* {this.state.redirectTo === "about" && <Redirect to="/about" />} */}
    </>
  );
};

export default Landing;
