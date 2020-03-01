import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Logo.scss";
import { Link } from "react-router-dom";

const Logo = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  return (
    <motion.div
      className="logo"
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
      <Link to="/">
        <motion.span
          animate={
            toggled
              ? { color: "#333", fontFamily: "inherit" }
              : { color: "#b1a59f", fontFamily: "Ma Shan Zheng" }
          }
        >
          {toggled ? "HONG" : "洪"}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default Logo;
