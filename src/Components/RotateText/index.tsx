import React from "react";
import "./RotateText.scss";

const RotateText: React.FC<{ text: string }> = ({ text }) => {
  return (
    <h1 className="heading rotate" style={{ visibility: "hidden" }}>
      <span className="rotate__text rotate__text--serif">{text}</span>
      <span className="rotate__text rotate__text--sans">{text}</span>
    </h1>
  );
};

export default RotateText;
