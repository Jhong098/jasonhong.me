import React from "react";
import { motion } from "framer-motion";
import { footer } from "copy";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <motion.footer className={styles.footer}>
      <p>{footer.text}</p>
    </motion.footer>
  );
};

export default Footer;
