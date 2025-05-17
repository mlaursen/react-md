import { Box, BoxProps } from "@react-md/core/box/Box";
import { Card } from "@react-md/core/card/Card";
import { cnb } from "cnbuilder";
import { type CSSProperties, type ReactElement } from "react";

import styles from "./MaterialGridCustomizationExample.module.scss";

export default function MaterialGridCustomizationExample(): ReactElement {
  return (
    <MaterialGrid>
      <Card {...gridCell({ order: 2, className: styles.container })}>
        Cell 1
      </Card>
      <Card className={styles.container}>Cell 2</Card>
      <Card
        {...gridCell({
          span: { phone: 4, tablet: 3, desktop: 6 },
          className: styles.container,
        })}
      >
        Cell 3
      </Card>
      <Card
        {...gridCell({ offset: { tablet: 4 }, className: styles.container })}
      >
        Cell 4
      </Card>
      <Card className={styles.container}>Cell 5</Card>
    </MaterialGrid>
  );
}

function MaterialGrid(
  props: Omit<BoxProps, "grid" | "gridColumns">
): ReactElement {
  return (
    <Box {...props} grid gridColumns={{ phone: 4, tablet: 8, desktop: 12 }} />
  );
}

type Breakpoint = "phone" | "tablet" | "desktop";
type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Breakpoints = { [key in Breakpoint]?: CellIndex };
type ValueOrBreakpoints = CellIndex | Breakpoints;

declare module "react" {
  type CellProperty = "span" | "order" | "offset";
  type CellPropertyWithBreakpoint =
    | CellProperty
    | `${Breakpoint}-${CellProperty}`;

  type CellProperties = {
    [name in `--cell-${CellPropertyWithBreakpoint}`]?: string | number;
  };

  interface CSSProperties extends CellProperties {}
}

const applyVar = (
  type: "span" | "order" | "offset",
  breakpoint: Breakpoint | "",
  value?: ValueOrBreakpoints,
  style?: CSSProperties
): CSSProperties | undefined => {
  if (typeof value !== "string" && typeof value !== "number") {
    return style;
  }

  const name = breakpoint
    ? (`--cell-${breakpoint}-${type}` as const)
    : (`--cell-${type}` as const);
  return {
    ...style,
    [name]: value,
  };
};

const BREAKPOINTS = ["phone", "tablet", "desktop"] as const;

const applyVarGroup = (
  type: "span" | "order" | "offset",
  value?: ValueOrBreakpoints,
  style?: CSSProperties
): CSSProperties | undefined => {
  style = applyVar(type, "", value, style);
  if (value && typeof value === "object") {
    BREAKPOINTS.forEach((breakpoint) => {
      style = applyVar(type, breakpoint, value[breakpoint], style);
    });
  }
  return style;
};

interface GridCellStyles {
  style?: CSSProperties;
  className?: string;
}

interface GridCellOptions extends GridCellStyles {
  span?: ValueOrBreakpoints;
  order?: ValueOrBreakpoints;
  offset?: ValueOrBreakpoints;
}

function gridCell(options: GridCellOptions): GridCellStyles {
  const { span, order, offset, className } = options;
  let style = applyVarGroup("span", span, options.style);
  style = applyVarGroup("order", order, style);
  style = applyVarGroup("offset", offset, style);

  let phoneSpan: CellIndex | undefined;
  let phoneOrder: CellIndex | undefined;
  let phoneOffset: CellIndex | undefined;
  let tabletSpan: CellIndex | undefined;
  let tabletOrder: CellIndex | undefined;
  let tabletOffset: CellIndex | undefined;
  let desktopSpan: CellIndex | undefined;
  let desktopOrder: CellIndex | undefined;
  let desktopOffset: CellIndex | undefined;
  if (span && typeof span === "object") {
    ({ phone: phoneSpan, tablet: tabletSpan, desktop: desktopSpan } = span);
  }
  if (order && typeof order === "object") {
    ({ phone: phoneOrder, tablet: tabletOrder, desktop: desktopOrder } = order);
  }
  if (offset && typeof offset === "object") {
    ({
      phone: phoneOffset,
      tablet: tabletOffset,
      desktop: desktopOffset,
    } = offset);
  }

  return {
    style,
    className: cnb(
      !!span && styles.span,
      !!order && styles.order,
      !!offset && styles.offset,
      typeof phoneSpan === "number" && styles.phoneSpan,
      typeof phoneOrder === "number" && styles.phoneOrder,
      typeof phoneOffset === "number" && styles.phoneOffset,
      typeof tabletSpan === "number" && styles.tabletSpan,
      typeof tabletOrder === "number" && styles.tabletOrder,
      typeof tabletOffset === "number" && styles.tabletOffset,
      typeof desktopSpan === "number" && styles.desktopSpan,
      typeof desktopOrder === "number" && styles.desktopOrder,
      typeof desktopOffset === "number" && styles.desktopOffset,
      className
    ),
  };
}
