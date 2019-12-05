/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

interface HoverImageProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  text: string;
  imageSrc: string;
}

const HoverImage: React.FC<HoverImageProps> = ({ text, imageSrc, ...rest }) => {
  return (
    <a aria-label="link-1" className="link w-inline-block" {...rest}>
      <h1 className="h1">{text}</h1>
      <img src={imageSrc} className="image" alt="art" />
    </a>
  );
};

export default HoverImage;
