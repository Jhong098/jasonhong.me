import React from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import copy from "copy";

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
      <Parallax ref={ref => (this.parallax = ref)} pages={3}>
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{
            backgroundColor: "#87BCDE",
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
              {copy.sections.map(({ header, image, text, redirect }, index) => (
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
                    this.parallax.scrollTo((index + 1) % copy.sections.length)
                  }
                >
                  <SectionImage
                    image={image}
                    titleText={header}
                    description={text}
                    onClick={() => this.redirect(redirect)}
                  />
                </ParallaxLayer>
              ))}
            </div>
          </div>
        </main>
        {this.state.redirectTo === "about" && <Redirect to="/about" />}
      </Parallax>
    );
  }
}

export default Landing;
