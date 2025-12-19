import { Box } from "@react-md/core/box/Box";
import { cssUtils } from "@react-md/core/cssUtils";
import * as colors from "@react-md/core/theme/colors";
import {
  DEFAULT_COLLATOR,
  alphaNumericSort,
} from "@react-md/core/utils/alphaNumericSort";
import { type ReactElement } from "react";

import { MATERIAL_COLORS, type MaterialColor } from "@/constants/theme.js";
import { titleCase } from "@/utils/strings.js";

import { Color } from "./Color.jsx";
import styles from "./ColorPalette.module.scss";

function assertMaterialColor(name: string): asserts name is MaterialColor {
  if (!MATERIAL_COLORS.includes(name as MaterialColor)) {
    throw new Error("Invalid Material Color");
  }
}

function getGroupName(varName: string): MaterialColor {
  const name = varName.replace(/(Accent)?\d+$/, "");
  assertMaterialColor(name);
  return name;
}

export function ColorPalette(): ReactElement {
  const { white, black, ...remaining } = colors;
  const sorted = alphaNumericSort(Object.entries(remaining), {
    compare: (a, b) => {
      const aName = getGroupName(a);
      const bName = getGroupName(b);
      // make sure the values are sorted from 50 - 900 and
      // 100 -> 200 -> 400 -> 700
      if (aName === bName) {
        return DEFAULT_COLLATOR.compare(a, b);
      }

      // make sure the group of colors are sorted like original material design
      // setup
      return MATERIAL_COLORS.indexOf(aName) - MATERIAL_COLORS.indexOf(bName);
    },
    extractor: ([name]) => name,
  });

  const groups = new Map<MaterialColor, string[]>();
  for (const [varName, value] of sorted) {
    const groupName = getGroupName(varName);
    const group = groups.get(groupName) ?? [];
    group.push(value);
    groups.set(groupName, group);
  }

  return (
    <Box
      grid
      fullWidth
      disablePadding
      align="start"
      className={cssUtils({
        className: styles.container,
        fontWeight: "bold",
      })}
    >
      {[...groups.entries()].map(([groupName, colors]) => {
        const name = titleCase(groupName);
        const fiveHundredColor = colors[5];
        return (
          <ul key={groupName} className={styles.list}>
            <Color heading={name} name="500" value={fiveHundredColor} />
            {colors.map((value, i) => (
              <Color key={value} i={i} value={value} />
            ))}
          </ul>
        );
      })}
      <ul className={styles.list}>
        <Color heading="Black" name="black" value={black} />
        <Color heading="White" name="white" value={white} />
      </ul>
    </Box>
  );
}
