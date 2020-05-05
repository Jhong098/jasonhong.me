import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Logo.scss";
import { Link } from "react-router-dom";

const Logo = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  return (
    <Link to="/">
      <motion.div
        className={`logo ${toggled ? "toggled" : ""}`}
        onMouseEnter={() => setToggled(true)}
        onMouseLeave={() => setToggled(false)}
        animate={
          toggled
            ? {
                background: "#b1a59f"
              }
            : { background: "#333" }
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.span
          animate={
            toggled
              ? { color: "#333", fontFamily: "inherit" }
              : { color: "#b1a59f", fontFamily: "Ma Shan Zheng" }
          }
        >
          {toggled ? "HONG" : "洪"}
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default Logo;
