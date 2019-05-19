import React, { FunctionComponent, memo } from "react";
import Head from "next/head";

export interface GoogleFontProps {
  font: string;
}

const GoogleFont: FunctionComponent<GoogleFontProps> = ({ font }) => {
  const name = font.split(" ").join("+");

  return (
    <Head>
      <link
        key={name}
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css?family=${name}`}
      />
    </Head>
  );
};

export default memo(GoogleFont);
