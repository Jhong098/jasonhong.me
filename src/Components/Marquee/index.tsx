import React from "react";

const Marquee = () => {
  return (
    <div className="marquee">
      <div className="marquee__inner" aria-hidden="true">
        <span>Case Studies</span>
        <span>Case Studies</span>
        <span>Case Studies</span>
        <span>Case Studies</span>
      </div>
    </div>
  );
};

export default Marquee;
