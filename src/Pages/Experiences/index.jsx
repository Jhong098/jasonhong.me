import React, { useState } from "react";
// import PageContainer from "Components/PageContainer";
// import PageTitle from "Components/PageTitle";

import { animated, useSpring } from "react-spring";

import { experiencesList } from "copy";
import "./Experiences.scss";
import { motion } from "framer-motion";
import { useRouteMatch, Link } from "react-router-dom";

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
// const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;
// const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`;
const trans3 = (x, y) => `translate3d(${x / 6 - 150}px,${y / 6 - 200}px,0)`;

const Experiences = () => {
  const { url } = useRouteMatch();
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));
  const [hovered, setHovered] = useState(0);

  return (
    <motion.div
      id="experience-container"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
    >
      <ul>
        {experiencesList.map(({ title }, i) => (
          <li key={title} onMouseEnter={() => setHovered(i)}>
            <Link
              className={`experience-title ${i === hovered ? "active" : " "}`}
              to={`${url}/${i}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <animated.img
        className="experience-img"
        src={experiencesList[hovered].img}
        alt={experiencesList[hovered].desc}
        style={{ transform: props.xy.interpolate(trans3) }}
      />
    </motion.div>
  );
};

export default Experiences;
