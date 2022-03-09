import { ReactElement } from "react";
import * as MaterialIcons from "@react-md/material-icons";
import { Tooltip, useTooltip } from "@react-md/tooltip";

import Code from "components/Code";

import styles from "./AllIcons.module.scss";

const allIcons = Object.entries(MaterialIcons).filter(([name]) =>
  name.endsWith("SVGIcon")
);

function TooltippedName({ name }: { name: string }): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    baseId: `icon-${name}`,
  });

  return (
    <>
      <Code {...elementProps} className={styles.name} tabIndex={0}>
        {name.replace(/SVGIcon/, "")}
      </Code>
      <Tooltip {...tooltipProps}>{name}</Tooltip>
    </>
  );
}

export default function AllIcons(): ReactElement {
  return (
    <div className={styles.container}>
      {allIcons.map(([name, Icon]) => (
        <div key={name} className={styles.icon}>
          <Icon />
          <TooltippedName name={name} />
        </div>
      ))}
    </div>
  );
}
