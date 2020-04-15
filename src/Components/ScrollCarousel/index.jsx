import React, { useCallback, useEffect, useRef } from "react";
import { useSpring, animated as a, interpolate } from "react-spring";
import useWindowScroll from "@react-hook/window-scroll";
import useScrollWidth from "./useScrollWidth";

import "./ScrollCarousel.scss";

const ScrollCarousel = ({ children }) => {
  const refHeight = useRef(null);
  const refTransform = useRef(null);

  const { scrollWidth } = useScrollWidth(refTransform);

  // the argument is the fps that the hook uses,
  // since react spring interpolates values we can safely reduce this below 60
  const scrollY = useWindowScroll(45);
  const [{ st, xy }, set] = useSpring(() => ({ st: 0, xy: [0, 0] }));

  useEffect(() => {
    set({ st: scrollY });
  }, [scrollY, set]);

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      set({ xy: [x - window.innerWidth / 2, y - window.innerHeight / 2] }),
    [set]
  );

  const top = refHeight.current ? refHeight.current.offsetTop : 0;
  const width = refHeight.current ? refHeight.current.offsetWidth : 0;

  // we want to set the scrolling element *height* to the value of the *width* of the horizontal content
  // plus some other calculations to convert it from a width to a height value
  const elHeight =
    scrollWidth - (window.innerWidth - window.innerHeight) + width * 0.5; // scroll away when final viewport width is 0.5 done

  const interpTransform = interpolate([st, xy], (o, xy) => {
    const mouseMoveDepth = 40; // not necessary, but nice to have
    const x = width - (top - o) - width;

    // (width * 0.5) so that it starts moving just slightly before it comes into view
    if (x < -window.innerHeight - width * 0.5) {
      // element is not yet in view, we're currently above it. so don't animate the translate value
      return `translate3d(${window.innerHeight}px, 0, 0)`;
    }

    if (Math.abs(x) > elHeight) {
      // element is not in view, currently below it.
      return `translate3d(${elHeight}px, 0, 0)`;
    }

    // else animate as usual
    return `translate3d(${-x + -xy[0] / mouseMoveDepth}px, ${-xy[1] /
      mouseMoveDepth}px, 0)`;
  });

  return (
    <div
      onMouseMove={onMouseMove}
      className="scroll-carousel"
      ref={refHeight}
      style={{ height: elHeight }}
    >
      <div className="sticky-box">
        <a.div
          style={{ transform: interpTransform }}
          className="transform-box"
          ref={refTransform}
        >
          {children}
        </a.div>
      </div>
    </div>
  );
};

export default ScrollCarousel;
