import { GithubLink } from "@/components/GithubLink.jsx";
import { type ReactElement } from "react";
import styles from "./SourceLink.module.scss";

export interface SourceLinkProps {
  name: string;
}

export default function SourceLink(props: SourceLinkProps): ReactElement {
  const { name } = props;

  return (
    <GithubLink
      file={`packages/core/src/test-utils/polyfills/${name}.ts`}
      iconSize="small"
      className={styles.link}
      label="Source code"
      tooltipOptions={{ defaultPosition: "left" }}
    />
  );
}
