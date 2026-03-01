import { type HTMLAttributes, type ReactElement, type Ref } from "react";

import { elevation } from "./styles.js";

export interface ElevationProps extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
}

export function Elevation(props: Readonly<ElevationProps>): ReactElement {
  const { className, ...remaining } = props;

  return <span {...remaining} className={elevation({ className })} />;
}
