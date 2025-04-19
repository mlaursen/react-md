import { box } from "@react-md/core/box/styles";
import { useElementInteraction } from "@react-md/core/interaction/useElementInteraction";
import { contrastColor } from "@react-md/core/theme/utils";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import { SrOnly } from "@react-md/core/typography/SrOnly";
import CheckIcon from "@react-md/material-icons/CheckIcon";
import {
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
  useId,
} from "react";

import styles from "./MaterialColorRadio.module.scss";

export interface MaterialColorRadioProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label: ReactNode;
}

export function MaterialColorRadio({
  name,
  value,
  label,
  ...props
}: Readonly<MaterialColorRadioProps>): ReactElement {
  const { elementProps, tooltipProps } = useTooltip<HTMLLabelElement>({
    dense: true,
    hoverTimeout: 0,
    defaultPosition: "right",
  });
  const { handlers, ripples } = useElementInteraction({
    ...elementProps,
    onClick(event) {
      // stop propagation so 2 ripples are not created
      event.stopPropagation();
    },
  });

  return (
    <>
      <label
        {...elementProps}
        {...handlers}
        style={{ "--color": value, color: contrastColor(value) }}
        className={box({
          disablePadding: true,
          disableWrap: true,
          disableGap: true,
          justify: "center",
          className: styles.container,
        })}
      >
        <SrOnly>{label}</SrOnly>
        <input
          {...props}
          id={useId()}
          type="radio"
          name={name}
          value={value}
          className="rmd-hidden-input"
        />
        <CheckIcon className={styles.check} theme="currentcolor" />
        {ripples}
      </label>
      <Tooltip {...tooltipProps}>{label}</Tooltip>
    </>
  );
}
