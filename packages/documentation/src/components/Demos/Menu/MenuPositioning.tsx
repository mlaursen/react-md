import React, { FC, useState } from "react";
import { upperFirst } from "lodash";
import { Checkbox, Select, useChecked } from "@react-md/form";
import { ArrowDropDownSVGIcon } from "@react-md/material-icons";
import { DropdownMenu } from "@react-md/menu";
import {
  ABOVE_CENTER_ANCHOR,
  ABOVE_INNER_LEFT_ANCHOR,
  ABOVE_INNER_RIGHT_ANCHOR,
  ABOVE_LEFT_ANCHOR,
  ABOVE_RIGHT_ANCHOR,
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BELOW_INNER_RIGHT_ANCHOR,
  BELOW_LEFT_ANCHOR,
  BELOW_RIGHT_ANCHOR,
  BOTTOM_CENTER_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  BOTTOM_LEFT_ANCHOR,
  BOTTOM_RIGHT_ANCHOR,
  CENTER_CENTER_ANCHOR,
  CENTER_INNER_LEFT_ANCHOR,
  CENTER_INNER_RIGHT_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  PositionAnchor,
  TOP_CENTER_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_LEFT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "@react-md/utils";

import styles from "./MenuPositioning.module.scss";

const anchors = [
  ABOVE_LEFT_ANCHOR,
  ABOVE_INNER_LEFT_ANCHOR,
  ABOVE_CENTER_ANCHOR,
  ABOVE_INNER_RIGHT_ANCHOR,
  ABOVE_RIGHT_ANCHOR,
  TOP_LEFT_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_CENTER_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_RIGHT_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_INNER_LEFT_ANCHOR,
  CENTER_CENTER_ANCHOR,
  CENTER_INNER_RIGHT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  BOTTOM_LEFT_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_CENTER_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  BOTTOM_RIGHT_ANCHOR,
  BELOW_LEFT_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_RIGHT_ANCHOR,
  BELOW_RIGHT_ANCHOR,
];

function getLabel({ x, y }: PositionAnchor): string {
  return `${upperFirst(y)} ${upperFirst(x)} anchor`;
}

const options = anchors.map((anchor, index) => ({
  label: getLabel(anchor),
  value: `${index}`,
}));

// don't include all items to better show how the position affects the menu
const items = options.slice(0, 5).map(({ label }) => label);

const MenuPositioning: FC = () => {
  const [anchorIndex, setAnchorIndex] = useState(() =>
    anchors.findIndex((a) => a === CENTER_CENTER_ANCHOR)
  );
  const [equalWidth, handleChange, setEqualWidth] = useChecked(false);
  const anchor = anchors[anchorIndex];
  if (anchor.x !== "center" && equalWidth) {
    setEqualWidth(false);
  }

  return (
    <>
      <Select
        id="menu-anchor-select"
        label="Menu Anchor"
        options={options}
        value={`${anchorIndex}`}
        onChange={(value) => {
          const i = parseInt(value, 10);
          if (!Number.isNaN(i) && i >= 0 && i <= options.length) {
            setAnchorIndex(i);
          }
        }}
      />
      <Checkbox
        id="menu-anchor-equal-width"
        label="Equal Width?"
        checked={equalWidth}
        onChange={handleChange}
        disabled={anchor.x !== "center"}
      />
      <DropdownMenu
        id="menu-anchor"
        anchor={anchor}
        items={items}
        menuLabel="Menu"
        theme="secondary"
        themeType="contained"
        dropdownIcon={<ArrowDropDownSVGIcon className={styles.icon} />}
        className={styles.button}
        positionOptions={{ width: equalWidth ? "equal" : "auto" }}
      >
        <span className={styles.text}>Menu</span>
      </DropdownMenu>
    </>
  );
};

export default MenuPositioning;
