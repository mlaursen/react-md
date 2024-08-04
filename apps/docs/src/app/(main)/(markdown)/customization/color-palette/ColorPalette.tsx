import { titleCase } from "@/utils/strings.js";
import { Box } from "@react-md/core/box/Box";
import { cssUtils } from "@react-md/core/cssUtils";
import * as colors from "@react-md/core/theme/colors";
import {
  alphaNumericSort,
  DEFAULT_COLLATOR,
} from "@react-md/core/utils/alphaNumericSort";
import { type ReactElement } from "react";
import { Color } from "./Color.jsx";
import styles from "./ColorPalette.module.scss";

const GROUP_ORDER = [
  "red",
  "pink",
  "purple",
  "deepPurple",
  "indigo",
  "blue",
  "lightBlue",
  "cyan",
  "teal",
  "green",
  "lightGreen",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deepOrange",
  "brown",
  "grey",
  "blueGrey",
] as const;
type Group = (typeof GROUP_ORDER)[number];

function assertGroup(name: string): asserts name is Group {
  if (!GROUP_ORDER.includes(name as Group)) {
    throw new Error();
  }
}

function getGroupName(varName: string): Group {
  const name = varName.replace(/(Accent)?\d+$/, "");
  assertGroup(name);
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
      return (
        GROUP_ORDER.indexOf(aName as Group) -
        GROUP_ORDER.indexOf(bName as Group)
      );
    },
    extractor: ([name]) => name,
  });

  const groups = new Map<Group, string[]>();
  sorted.forEach(([varName, value]) => {
    const groupName = getGroupName(varName);
    const group = groups.get(groupName) ?? [];
    group.push(value);
    groups.set(groupName, group);
  });

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
      {Array.from(groups.entries()).map(([groupName, colors]) => {
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
