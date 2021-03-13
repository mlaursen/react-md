import React, { memo, ReactElement } from "react";
import Head from "next/head";

export interface GoogleFontProps {
  font: string;
}

export default memo(function GoogleFont({
  font,
}: GoogleFontProps): ReactElement {
  const name = font.split(" ").join("+");

  return (
    <Head>
      <link
        key={name}
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css?family=${name}&display=swap`}
      />
    </Head>
  );
});
