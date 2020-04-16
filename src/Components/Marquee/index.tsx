import React from "react";
import "./Marquee.scss";

const Marquee: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="container">
      <div className="marquee">
        <div className="marquee__inner" aria-hidden="true">
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
