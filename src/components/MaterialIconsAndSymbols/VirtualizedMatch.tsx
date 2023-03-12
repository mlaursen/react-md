import type { ButtonProps } from "@react-md/core";
import { box, Button, typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { ReactElement, ReactNode } from "react";
import { useHowToUseIcon } from "./HowToUse";
import type { MaterialIconAndSymbolName } from "./metadata";

import styles from "./VirtualizedMatch.module.scss";

export interface VirtualizedMatchProps extends Omit<ButtonProps, "children"> {
  name: MaterialIconAndSymbolName;
  icon: ReactNode;
}

export function VirtualizedMatch(props: VirtualizedMatchProps): ReactElement {
  const { name, icon, className, ...remaining } = props;
  const { selectIcon } = useHowToUseIcon();

  return (
    <Button
      {...remaining}
      className={box({
        className: cnb(
          typography({
            className,
            type: "body-1",
          }),
          styles.button
        ),
        stacked: true,
      })}
      onClick={() => {
        selectIcon(name);
      }}
    >
      {icon}
      <span>{name.replace(/_/g, " ")}</span>
    </Button>
  );
}
