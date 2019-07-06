import React, { FC, Fragment } from "react";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import { bem } from "@react-md/theme";
import { Text } from "@react-md/typography";
import { HorizontalPosition, VerticalPosition } from "@react-md/utils";

import Code from "components/Code/Code";

import "./MenuPositioning.scss";

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

const block = bem("example-menu-button");

const MenuPositioning: FC = () => (
  <Fragment>
    {horizontalPositions.map((x, i) => (
      <Fragment key={x}>
        <Text type="headline-6" margin={i == 0 ? "none" : "top"}>
          Horizontal Position: <Code>{x}</Code>
        </Text>
        <div className="menu-positioning-container">
          <div className="menu-positioning-group">
            {verticalPositions.map(y => (
              <DropdownMenu
                id={`position-${x}-${y}`}
                key={y}
                anchor={{ x, y }}
                items={items}
                menuLabel="Menu"
                themeType="outline"
                dropdownIcon={
                  <ArrowDropDownSVGIcon className={block("icon")} />
                }
                className={block()}
              >
                <span className={block("text")}>{y}</span>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </Fragment>
    ))}
  </Fragment>
);

export default MenuPositioning;
