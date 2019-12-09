import React, { useEffect } from "react";
import { init } from "Components/Scroller/scroller";
import "./Scroller.scss";
import { Art, Me, Temple } from "static/img";
import SectionImage from "Components/SectionImage";

const Scroller = () => {
  useEffect(() => {
    init();
  }, []);

  return (
    <main>
      <div data-scroll className="page page--layout-1">
        <div className="content content--offset">
          <SectionImage
            image={Me}
            titleText="Me"
            description="about me."
            aspectRatio="1/1"
            onClick={() => {}}
          />
          <SectionImage
            image={Art}
            titleText="Art"
            description="about my art."
            aspectRatio="4/3"
            onClick={() => {}}
          />
          <SectionImage
            image={Temple}
            titleText="Travel"
            description="about my travels."
            aspectRatio="624/416"
            onClick={() => {}}
          />
        </div>
      </div>
    </main>
  );
};

export default Scroller;
