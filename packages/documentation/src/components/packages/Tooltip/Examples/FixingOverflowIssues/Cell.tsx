import * as React from "react";
import cn from "classnames";
import { GridCellProps } from "react-virtualized";
import { Text } from "@react-md/typography";
import { MagicTooltip } from "@react-md/tooltip";

const Cell: React.SFC<GridCellProps> = ({ style, columnIndex, rowIndex }) => {
  const id = `cell-${rowIndex}-${columnIndex}`;
  const tooltipId = `cell-tooltip-${rowIndex}-${columnIndex}`;
  const children = `Cell ${rowIndex}-${columnIndex}`;
  return (
    <div
      id={id}
      style={style}
      role="gridcell"
      aria-colcount={100}
      aria-rowcount={100}
      aria-colindex={columnIndex + 1}
      aria-rowindex={rowIndex + 1}
      aria-describedby={tooltipId}
      className="tooltip-overflow-example__cell"
      tabIndex={-1}
    >
      <Text type="body-2" aria-describedby={tooltipId} tagName="div">
        {children}
      </Text>
      <MagicTooltip id={tooltipId} key={tooltipId}>{`Tooltip for ${children}`}</MagicTooltip>
    </div>
  );
};

export default Cell;
