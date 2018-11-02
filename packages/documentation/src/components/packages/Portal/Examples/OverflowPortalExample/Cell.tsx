import * as React from "react";
import cn from "classnames";
import { GridCellProps } from "react-virtualized";
import { Text } from "@react-md/typography";
import { TooltipPosition } from "@react-md/tooltip";
import { positionRelativeTo, HorizontalPosition, VerticalPosition } from "@react-md/utils";

import CellTooltip from "./CellTooltip";

export interface ICellProps extends GridCellProps {
  active: boolean;
  portal: boolean;
}

export interface ICellState {
  tooltipStyle?: React.CSSProperties;
  visible: boolean;
}

export default class Cell extends React.Component<ICellProps, ICellState> {
  private container: React.RefObject<HTMLDivElement>;
  constructor(props: ICellProps) {
    super(props);

    this.state = { visible: false };
    this.container = React.createRef();
  }

  public render() {
    const { tooltipStyle, visible } = this.state;
    const { style, columnIndex, rowIndex, portal, active } = this.props;
    const id = `cell-${rowIndex}-${columnIndex}`;
    const tooltipId = `cell-tooltip-${rowIndex}-${columnIndex}`;
    return (
      <div
        id={id}
        ref={this.container}
        style={style}
        role="gridcell"
        aria-colcount={100}
        aria-rowcount={100}
        aria-colindex={columnIndex + 1}
        aria-rowindex={rowIndex + 1}
        className={cn("overflow-portal-example__cell", {
          "overflow-portal-example__cell--active": active,
        })}
        onMouseEnter={this.showTooltip}
        onMouseLeave={this.hideTooltip}
      >
        <Text type="body-2" aria-describedby={tooltipId} component="div">
          {`Cell ${rowIndex}-${columnIndex}`}
          <CellTooltip style={tooltipStyle} id={tooltipId} portal={portal} visible={visible} />
        </Text>
      </div>
    );
  }

  private showTooltip = () => {
    const container = this.container.current;
    if (!container || this.state.visible) {
      return;
    }

    const tooltip = document.getElementById(container.getAttribute("aria-describedby") as string);
    this.setState({
      tooltipStyle: positionRelativeTo(container, tooltip, {
        verticalPosition: "below",
        verticalSpacing: "1.5rem",
        isPortalFixed: this.props.portal,
      }),
      visible: true,
    });
  };

  private hideTooltip = () => {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  };
}
