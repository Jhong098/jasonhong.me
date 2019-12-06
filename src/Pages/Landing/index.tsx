/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import imagesLoaded from "imagesloaded";
import RGBShiftEffect from "Components/EffectShell/Effect";
import { Me, Art, Temple } from "static/img";
import "./Landing.scss";
import HoverImage from "Components/HoverImage";

const Landing = () => {
  const [hovered, setHovered] = useState(false);
  const effect = useRef();

  // Preload images
  const preloadImages = () => {
    return new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll("img"), resolve);
    });
  };

  useEffect(() => {
    const container = document.body;
    const itemsWrapper = document.querySelector(".landing");
    preloadImages().then(() => {
      // Remove the loader
      effect.current = new RGBShiftEffect(container, itemsWrapper, {
        strength: 0.25
      });
    });
  }, []);

  const handleMouseLeave = () => {
    setHovered(false);
    if (effect && effect.current) {
      (effect as any).current.onMouseLeave();
    }
  };

  return (
    <div className="landing">
      <div className="bg en">Jason</div>
      <div className="bg ch">人杰</div>
      <div className={`text ${hovered ? "hovered" : ""}`}>
        <HoverImage
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          text="Jason Hong"
          imageSrc={Me}
        />
        <span>
          {" "}
          is a Computer Engineering student at the University of Waterloo. He
          loves to
        </span>
        <HoverImage
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          text=" travel, "
          imageSrc={Temple}
        />
        <HoverImage
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          text="draw"
          imageSrc={Art}
        />
        <span>, and take photos</span>
      </div>
    </div>
  );
};

export default Landing;
