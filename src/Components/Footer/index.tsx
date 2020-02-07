import React from "react";
import { motion } from "framer-motion";
import { footer } from "copy";
import "./Footer.scss";

const Footer = () => {
  return (
    <motion.footer>
      <p>{footer.text}</p>
    </motion.footer>
  );
};

export default Footer;
