import React from "react";
import { Link } from "react-router-dom";

const ASSET_PATH = "/assets/";

export default function Footer() {
  return (
    <footer id="footer">
      <Link className="brand footer-brand" to="/">
        <span className="brand-mark">
          <img src={ASSET_PATH + "logo-panda.jpeg"} alt="S Square Elite Logo" />
        </span>
        <span>
          <b>S SQUARE</b>
          <em>Elite</em>
          <small>G I F T&nbsp; S H O P</small>
        </span>
      </Link>
      <p>
        Little moments, big smiles. Thoughtful gifts for all the people you
        love. Delivering smiles across Tamil Nadu and beyond.
      </p>
      <span>© 2026 S Square Elite Gift Shop. All rights reserved.</span>
    </footer>
  );
}
