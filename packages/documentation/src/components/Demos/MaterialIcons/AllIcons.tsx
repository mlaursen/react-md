import React, { FC } from "react";
import * as MaterialIcons from "@react-md/material-icons";
import { Tooltipped } from "@react-md/tooltip";

import Code from "components/Code/Code";

import styles from "./AllIcons.module.scss";

const allIcons = Object.entries(MaterialIcons).filter(([name]) =>
  name.endsWith("SVGIcon")
);

const AllIcons: FC = () => (
  <div className={styles.container}>
    {allIcons.map(([name, Icon]) => (
      <div key={name} className={styles.icon}>
        <Icon />
        <Tooltipped id={`icon-${name}`} tooltip={name}>
          {({ tooltip, ...a11y }) => (
            <>
              <Code {...a11y} className={styles.name} tabIndex={0}>
                {name.replace(/SVGIcon/, "")}
              </Code>
              {tooltip}
            </>
          )}
        </Tooltipped>
      </div>
    ))}
  </div>
);

export default AllIcons;
