import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Logo.scss";

const Logo = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  return (
    <motion.div
      className="logo"
      onMouseEnter={() => setToggled(true)}
      onMouseLeave={() => setToggled(false)}
      animate={toggled ? { background: "#b1a59f" } : { background: "#333" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <a href="/">
        <motion.span
          animate={toggled ? { color: "#333" } : { color: "#b1a59f" }}
        >
          {toggled ? "HONG" : "洪"}
        </motion.span>
      </a>
    </motion.div>
  );
};

export default Logo;
