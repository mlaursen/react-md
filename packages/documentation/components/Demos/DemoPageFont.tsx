import React, { FunctionComponent } from "react";
import Head from "next/head";

import GoogleFont from "components/GoogleFont";

export interface DemoPageFontProps {
  font: string;
}

const DemoPageFont: FunctionComponent<DemoPageFontProps> = ({ font }) => {
  if (font === "Font Awesome") {
    return (
      <Head>
        <link
          key="font-awesome"
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css"
        />
      </Head>
    );
  }

  return <GoogleFont font={font} />;
};

export default DemoPageFont;
