import React, { FC } from "react";
import { Link } from "@react-md/link";

import "./SkipToMainContent.scss";

const SkipToMainContent: FC = () => (
  <Link
    id="skip-to-main-content"
    className="skip-to-main-content skip-to-main-content"
    href="#main-content"
    onClick={event => {
      event.preventDefault();
      const main = document.getElementById("main-content");
      if (main) {
        main.focus();
      }
    }}
  >
    Skip to main content
  </Link>
);

export default SkipToMainContent;
