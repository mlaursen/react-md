/* eslint-disable react/no-danger */
import React, { FC, Fragment } from "react";
import { GA_CODE, GA_SRC } from "constants/index";

const html = {
  __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_CODE}');`,
};

const Analytics: FC = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Fragment>
      <script src={GA_SRC} async />
      <script dangerouslySetInnerHTML={html} />
    </Fragment>
  );
};

export default Analytics;
