import React from "react";
import style from "./Footer.module.css";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className={style.message}>
        <p>Created by Tomas Brenner</p>
      </div>
      <div className={style.links}>
        <a
          href="https://www.linkedin.com/in/tomasbrenner/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <FaLinkedinIn />{" "}
        </a>
        <a
          href="https://github.com/Tomibrenner"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          <FaGithub />{" "}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
