import TagIcon from "@react-md/material-icons/TagIcon";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";

import styles from "./HeadingStructureIcon.module.scss";

export interface HeadingStructureIconProps {
  isLast?: boolean;
}

export function HeadingStructureIcon({
  isLast,
}: Readonly<HeadingStructureIconProps>): ReactElement {
  return (
    <>
      <span className={cnb(styles.container, isLast && styles.last)} />
      <TagIcon />
    </>
  );
}
