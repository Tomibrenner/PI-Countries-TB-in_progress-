import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="message">
        <p>Created by Tomas Brenner</p>
      </div>
      <div className="links">
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
