import React from "react";
import "./Landing.scss";
import SectionImage from "Components/SectionImage";
import { Redirect } from "react-router-dom";
import { Parallax, ParallaxLayer } from "react-spring/renderprops-addons";
import copy from "copy";

const url = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

class Landing extends React.Component {
  state = {
    redirectTo: ""
  };
  parallax: any;
  redirect = (to: string) => {
    this.setState(() => ({
      redirectTo: to
    }));
  };

  render() {
    return (
      <Parallax ref={ref => (this.parallax = ref)} pages={3}>
        <ParallaxLayer offset={1} speed={1}>
          <div
            style={{
              backgroundColor: "#805E73",
              width: "inherit",
              height: "inherit"
            }}
          />
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0} factor={3}>
          <div
            style={{
              backgroundImage: url("stars", true),
              backgroundSize: "cover",
              width: "inherit",
              height: "inherit"
            }}
          />
        </ParallaxLayer>
        <main>
          <div className="page">
            <div className="content content--center">
              {copy.sections.map(({ header, image, text, redirect }, index) => (
                <div
                  key={index}
                  onClick={() =>
                    this.parallax.scrollTo((index + 1) % copy.sections.length)
                  }
                >
                  <ParallaxLayer offset={index} speed={0.1}>
                    <SectionImage
                      image={image}
                      titleText={header}
                      description={text}
                      onClick={() => this.redirect(redirect)}
                    />
                  </ParallaxLayer>
                </div>
              ))}

              {/* <SectionImage
                image={Art}
                titleText="Art"
                description="about my art."
                onClick={() => this.redirect("art")}
              />
              <SectionImage
                image={Temple}
                titleText="Travel"
                description="about my travels."
                onClick={() => this.redirect("travel")}
              /> */}
            </div>
          </div>
        </main>
        {this.state.redirectTo === "about" && <Redirect to="/about" />}
      </Parallax>
    );
  }
}

export default Landing;
