import React from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

import "./SectionImage.scss";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
// const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 6 - 150}px,${y / 6 - 200}px,0)`;
// const trans4 = (x: any, y: any) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`;

const SectionImage = ({ image, titleText, redirect }) => {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  return (
    <Link to={redirect}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="content__item"
        // onClick={onClick}
        onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      >
        <animated.div
          className="content__item-imgwrap"
          style={{ transform: props.xy.to(trans1) }}
        >
          <div
            className="content__item-img"
            style={{
              backgroundImage: `url("${image}")`
            }}
          ></div>
        </animated.div>
        <animated.h2
          style={{ transform: props.xy.to(trans3) }}
          className="content__item-title content__item-title--layer"
        >
          {titleText}
        </animated.h2>
      </motion.div>
    </Link>
  );
};

export default SectionImage;
