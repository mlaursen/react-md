import { Box } from "@react-md/core/box/Box";
import { link } from "@react-md/core/link/styles";
import { typography } from "@react-md/core/typography/typographyStyles";
import Link from "next/link.js";
import { type ReactElement } from "react";
import "server-only";

import SsrOnlyExample from "../SsrOnlyExample.js";
import styles from "./page.module.scss";

const BASE_HREF = "/components/skeleton-placeholder";

export default function SsrOnlyExamplePage(): ReactElement {
  return (
    <div className={styles.container}>
      <SsrOnlyExample />
      <Box
        stacked
        disablePadding
        justify="center"
        className={typography({ type: "headline-4" })}
      >
        <a href={`${BASE_HREF}/ssr-only`} className={link()}>
          Reload
        </a>
        <Link href={`${BASE_HREF}#ssr-only`} className={link()}>
          Back to demos
        </Link>
      </Box>
    </div>
  );
}
