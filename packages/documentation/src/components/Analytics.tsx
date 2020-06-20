/* eslint-disable react/no-danger */
import React, { ReactElement } from "react";

import { GA_CODE } from "constants/github";

const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_CODE}`;

const html = {
  __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_CODE}');`,
};

export default function Analytics(): ReactElement | null {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <script src={GA_SRC} async />
      <script dangerouslySetInnerHTML={html} />
    </>
  );
}
