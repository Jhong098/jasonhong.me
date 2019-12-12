import React from "react";
import { motion } from "framer-motion";

interface SectionImageProps {
  image: string;
  titleText: string;
  description: string;
  onClick: () => void;
}

const SectionImage: React.FC<SectionImageProps> = ({
  image,
  titleText,
  description,
  onClick
}) => {
  return (
    <div className="content__item" onClick={onClick}>
      <div className="content__item-imgwrap">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="content__item-img"
          style={{ backgroundImage: `url("${image}")` }}
        ></motion.div>
      </div>
      <h2 className="content__item-title content__item-title--layer">
        {titleText}
      </h2>
      <p className="content__item-description">{description}</p>
    </div>
  );
};

export default SectionImage;
