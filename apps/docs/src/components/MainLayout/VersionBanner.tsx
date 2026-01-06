import { DISPLAY_NONE_CLASS } from "@react-md/core/utils/isElementVisible";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import { MAJOR_VERSION } from "@/constants/version.js";

import { Blockquote } from "../Blockquote.js";
import styles from "./VersionBanner.module.scss";

export interface VersionBannerProps {
  hidden?: boolean;
}

export function VersionBanner({
  hidden,
}: Readonly<VersionBannerProps>): ReactElement {
  return (
    <Blockquote
      theme="warning"
      className={cnb(styles.container, hidden && DISPLAY_NONE_CLASS)}
    >
      You are currently viewing documentation for version {MAJOR_VERSION} of
      ReactMD.
    </Blockquote>
  );
}
