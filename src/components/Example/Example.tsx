import { card } from "@react-md/card";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";
import { toLinkableId } from "src/utils/string";
import { LinkableHeading } from "../LinkableHeading";

import styles from "./Example.module.scss";

export interface ExampleConfiguration {
  title: string;
  description?: string;
  disableCard?: boolean;
}

export interface ExampleProps extends ExampleConfiguration {
  children: ReactNode;
}

export function Example(props: ExampleProps): ReactElement {
  const { title, description, children, disableCard } = props;

  const headingId = toLinkableId(title);
  return (
    <section aria-labelledby={headingId} id={`${headingId}-section`}>
      <LinkableHeading id={headingId} level={2}>
        {title}
      </LinkableHeading>
      <div
        id={`${headingId}-example`}
        className={cnb(
          !disableCard && card({ fullWidth: true }),
          !disableCard && styles.padded
        )}
      >
        {children}
      </div>
    </section>
  );
}
