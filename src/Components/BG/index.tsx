import React from "react";
import { motion } from "framer-motion";

type Dimension = string | number;

interface DimensionProps {
  startHeight: Dimension;
  startWidth: Dimension;
  endHeight?: Dimension;
  endWidth?: Dimension;
}

interface BGProps extends DimensionProps {
  stage: string;
  color: string;
}

const transition = { duration: 1.5, ease: "easeInOut" };

const bgStages = (
  startWidth: Dimension,
  startHeight: Dimension,
  endWidth: Dimension,
  endHeight: Dimension
) => ({
  hidden: { width: startWidth, height: startHeight, transition },
  expanded: { width: endWidth, height: endHeight, transition }
});

const BG: React.FC<BGProps> = ({
  startHeight,
  startWidth,
  endHeight = startHeight,
  endWidth = startWidth,
  stage,
  color
}) => {
  return (
    <motion.div
      style={{
        backgroundColor: color,
        height: startHeight,
        position: "fixed",
        zIndex: 0
      }}
      initial="hidden"
      animate={stage}
      exit="hidden"
      variants={bgStages(startWidth, startHeight, endWidth, endHeight)}
    ></motion.div>
  );
};

export default BG;
