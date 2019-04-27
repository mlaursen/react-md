import React, { FunctionComponent, Fragment } from "react";

const GA_CODE = process.env.GA_CODE || "UA-76079335-2";
const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_CODE}`;

const html = {
  __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_CODE}');`,
};

const Analytics: FunctionComponent = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Fragment>
      <script src={GA_CODE} async />
      <script dangerouslySetInnerHTML={html} />
    </Fragment>
  );
};

export default Analytics;
