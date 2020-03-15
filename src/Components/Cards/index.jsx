import React, { useState } from "react";
import { useSpring, useSprings, animated, interpolate } from "react-spring";
import { useGesture } from "react-use-gesture";

import "./Cards.scss";

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = i => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100
});

const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r /
    10}deg) rotateZ(${r}deg) scale(${s})`;
const trans3 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`;

const CLEAR_INTERVAL = 600;

const Cards = ({ images }) => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, set] = useSprings(images.length, i => ({
    ...to(i),
    from: from(i)
  })); // Create a bunch of springs using the helpers above

  const [transProps, setTransProps] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 }
  }));

  const [hovered, setHovered] = useState(0);

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useGesture({
    onDrag: ({
      args: [index],
      down,
      delta: [xDelta],
      movement: [mx],
      direction: [xDir],
      velocity
    }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) {
        gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      }
      set(i => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        if (!down && gone.size === images.length)
          setTimeout(() => gone.clear() || set(i => to(i)), CLEAR_INTERVAL);
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      });
    }
  });

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div id="cards">
      {
        <>
          {props.map(({ x, y, rot, scale }, i) => (
            <animated.div
              key={i}
              style={{
                transform: interpolate(
                  [x, y],
                  (x, y) => `translate3d(${x}px,${y}px,0)`
                )
              }}
            >
              <animated.div
                {...bind(i)}
                className="card"
                style={{
                  transform: interpolate([rot, scale], trans),
                  backgroundImage: `url(${images[i].img})`
                }}
                onMouseOver={() => setHovered(i)}
                onMouseMove={({ clientX: x, clientY: y }) =>
                  setTransProps({ xy: [x, y] })
                }
              />
              {hovered === i && (
                <animated.div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    zIndex: 5,
                    color: "#fff",
                    mixBlendMode: "difference",
                    transform: transProps.xy.interpolate(trans3)
                  }}
                >
                  {images[i].desc}
                </animated.div>
              )}
            </animated.div>
          ))}
        </>
      }
    </div>
  );
};

export default Cards;
