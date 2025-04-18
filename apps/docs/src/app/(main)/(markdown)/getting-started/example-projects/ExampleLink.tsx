import { cssUtils } from "@react-md/core/cssUtils";
import { Link } from "@react-md/core/link/Link";
import ChevronRightIcon from "@react-md/material-icons/ChevronRightIcon";
import { type ReactElement } from "react";

import { GITHUB_LINK_URL } from "@/constants/env.js";

import styles from "./ExampleLink.module.scss";

export interface ExampleLinkProps {
  type: "js" | "ts";
  path: string;
}

export function ExampleLink({
  path,
  type,
}: Readonly<ExampleLinkProps>): ReactElement {
  return (
    <Link
      href={`${GITHUB_LINK_URL}/examples/${path}`}
      target="_blank"
      className={cssUtils({
        textDecoration: "none",
        className: styles.container,
      })}
    >
      View {type === "js" ? "Javascript" : "Typescript"}
      <ChevronRightIcon
        dense
        inline
        theme="currentcolor"
        className={styles.icon}
      />
    </Link>
  );
}
