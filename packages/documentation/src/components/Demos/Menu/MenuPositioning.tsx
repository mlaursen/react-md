import React, { FC, Fragment } from "react";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { Text } from "@react-md/typography";
import { HorizontalPosition, VerticalPosition } from "@react-md/utils";

import Code from "components/Code/Code";

import styles from "./MenuPositioning.module.scss";

const items = ["Item 1", "Item 2", "Item 3"];

const verticalPositions: VerticalPosition[] = [
  "above",
  "below",
  "center",
  "top",
  "bottom",
];
const horizontalPositions: HorizontalPosition[] = [
  "inner-left",
  "inner-right",
  "center",
  "left",
  "right",
];

const MenuPositioning: FC = () => (
  <>
    {horizontalPositions.map((x, i) => (
      <Fragment key={x}>
        <Text type="headline-6" margin={i === 0 ? "none" : "top"}>
          Horizontal Position: <Code>{x}</Code>
        </Text>
        <div className={styles.container}>
          <div className={styles.group}>
            {verticalPositions.map((y) => (
              <DropdownMenu
                id={`position-${x}-${y}`}
                key={y}
                anchor={{ x, y }}
                items={items}
                menuLabel="Menu"
                themeType="outline"
                dropdownIcon={<ArrowDropDownSVGIcon className={styles.icon} />}
                className={styles.button}
              >
                <span className={styles.text}>{y}</span>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </Fragment>
    ))}
  </>
);

export default MenuPositioning;
