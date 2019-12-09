import React from "react";
import { motion } from "framer-motion";

interface SectionImageProps {
  image: string;
  titleText: string;
  description: string;
  aspectRatio: string;
  onClick: () => void;
}

const SectionImage: React.FC<SectionImageProps> = ({
  image,
  titleText,
  description,
  aspectRatio,
  onClick
}) => {
  return (
    <motion.div
      className="content__item"
      style={{ "--aspect-ratio": `${aspectRatio}` } as React.CSSProperties}
    >
      <div className="content__item-imgwrap">
        <motion.div
          className="content__item-img"
          whileHover={{ scale: 1.1 }}
          style={{ backgroundImage: `url("${image}")` }}
        ></motion.div>
      </div>
      <h2 className="content__item-title content__item-title--layer">
        {titleText}
      </h2>
      <p className="content__item-description">{description}</p>
    </motion.div>
  );
};

export default SectionImage;
