import React, { useState, useEffect, useRef } from "react";
import imagesLoaded from "imagesloaded";
import RGBShiftEffect from "Components/EffectShell/Effect";
import { Me, Art } from "static/img";
import "./Landing.scss";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const effect = useRef();

  // Preload images
  const preloadImages = () => {
    return new Promise((resolve, reject) => {
      imagesLoaded(document.querySelectorAll("img"), resolve);
    });
  };

  const initAnimations = useEffect(() => {
    const container = document.body;
    const itemsWrapper = document.querySelector(".landing");
    preloadImages().then(() => {
      // Remove the loader
      console.log("loaded");
      effect.current = new RGBShiftEffect(container, itemsWrapper, {
        strength: 0.25
      });
    });
    // setIsLoading(false);
  }, []);

  useEffect(() => initAnimations, [initAnimations]);
  return (
    <div className="landing">
      <div className={`text ${hovered ? "hovered" : ""}`}>
        <a
          aria-label="link-1"
          className="link w-inline-block"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            if (effect && effect.current) {
              (effect as any).current.onMouseLeave();
            }
          }}
        >
          <h1 className="h1">Jason Hong</h1>
          <img src={Me} className="image" alt="me" />
        </a>
        <span>
          {" "}
          is a Computer Engineering student at the University of Waterloo,
        </span>
        <a
          aria-label="link-1"
          className="link w-inline-block"
          onClick={() => {}}
        >
          <h1 className="h1">Traveller</h1>
          <img src={Art} className="image" alt="art" />
        </a>
      </div>
    </div>
  );
};

export default Landing;
