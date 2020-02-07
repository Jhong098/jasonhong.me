import React from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import { landing } from "../../copy";
import Footer from "Components/Footer";

const url = (name, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

class Landing extends React.Component {
  state = {
    redirectTo: ""
  };

  parallax;

  redirect = to => {
    this.setState(() => ({
      redirectTo: to
    }));
  };

  render() {
    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={landing.pages}>
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{
            backgroundColor: "#a1eeec",
            width: "inherit",
            height: "inherit"
          }}
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{
            backgroundColor: "#805E73",
            width: "inherit",
            height: "inherit"
          }}
        />
        <ParallaxLayer
          offset={3}
          speed={1}
          style={{
            backgroundColor: "#87BCDE",
            width: "inherit",
            height: "inherit"
          }}
        />
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: url("stars", true),
            backgroundSize: "cover",
            width: "inherit",
            height: "inherit"
          }}
        />
        <main>
          <div className="page">
            <div className="content content--center">
              {landing.sections.map(
                ({ header, image, text, redirect }, index) => (
                  <ParallaxLayer
                    key={index}
                    offset={index}
                    speed={0.2}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      left: 0
                    }}
                    onClick={() =>
                      this.parallax.scrollTo(
                        (index + 1) % landing.sections.length
                      )
                    }
                  >
                    <SectionImage
                      image={image}
                      titleText={header}
                      description={text}
                      onClick={() => this.redirect(redirect)}
                    />
                    {/* {index === landing.sections.length - 1 && <Footer />} */}
                  </ParallaxLayer>
                )
              )}
            </div>
          </div>
        </main>
        {this.state.redirectTo === "about" && <Redirect to="/about" />}
      </Parallax>
    );
  }
}

export default Landing;
