/* eslint-disable react/no-danger */
import type { ReactElement } from "react";

import { GA_CODE } from "constants/github";

const GA_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_CODE}`;

const GA_HTML = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA_CODE}');
`;

export default function Analytics(): ReactElement | null {
  if (process.env.NODE_ENV !== "production" && !GA_CODE) {
    return null;
  }

  return (
    <>
      <script src={GA_SRC} async />
      <script dangerouslySetInnerHTML={{ __html: GA_HTML }} />
    </>
  );
}
