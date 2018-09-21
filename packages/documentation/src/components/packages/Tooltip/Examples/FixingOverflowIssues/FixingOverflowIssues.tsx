import * as React from "react";
import { Grid, GridCellProps, AutoSizer } from "react-virtualized";
import { MagicTooltipProvider } from "@react-md/tooltip";

import "./fixing-overflow-issues.scss";
import Cell from "./Cell";

export interface IFixingOverflowIssuesProps {}

export interface IFixingOverflowIssuesState {
  portal: boolean;
  scrollToRow: number;
  scrollToColumn: number;
}

const ROW_COUNT = 100;
const COLUMN_COUNT = 100;

export default class FixingOverflowIssues extends React.Component<
  IFixingOverflowIssuesProps,
  IFixingOverflowIssuesState
> {
  constructor(props: IFixingOverflowIssuesProps) {
    super(props);

    this.state = { portal: false, scrollToRow: 0, scrollToColumn: 0 };
  }

  public componentDidUpdate(
    prevProps: IFixingOverflowIssuesProps,
    prevState: IFixingOverflowIssuesState
  ) {
    const { scrollToRow, scrollToColumn } = this.state;
    if (scrollToRow !== prevState.scrollToRow || scrollToColumn !== prevState.scrollToColumn) {
      this.focus(scrollToRow, scrollToColumn);
    }
  }

  public render() {
    const { portal, scrollToRow, scrollToColumn } = this.state;
    return (
      <React.Fragment>
        <MagicTooltipProvider portalIntoId={portal ? "tooltip-overflow-portal" : undefined}>
          <div
            className="tooltip-overflow-example"
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
          >
            <AutoSizer disableHeight>
              {({ width }) => (
                <Grid
                  height={300}
                  width={width}
                  rowHeight={48}
                  rowCount={ROW_COUNT}
                  columnCount={COLUMN_COUNT}
                  columnWidth={100}
                  cellRenderer={this.cellRenderer}
                  scrollToRow={scrollToRow}
                  scrollToColumn={scrollToColumn}
                />
              )}
            </AutoSizer>
          </div>
        </MagicTooltipProvider>
        <div style={{ width: "100%" }}>
          <label htmlFor="tooltip-overflow-portal-enable">Enable portal fix?</label>
          <input
            id="tooltip-overflow-portal-enable"
            type="checkbox"
            checked={portal}
            onChange={this.handlePortalChange}
          />
        </div>
        <span id="tooltip-overflow-portal" aria-hidden="true" />
      </React.Fragment>
    );
  }

  private handlePortalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.currentTarget;
    if (this.state.portal !== checked) {
      this.setState({ portal: checked });
    }
  };

  private cellRenderer = (props: GridCellProps) => <Cell {...props} />;

  private getPosition = (target: HTMLDivElement) => {
    const row = parseInt(target.getAttribute("aria-rowindex") || "0", 10) - 1;
    const col = parseInt(target.getAttribute("aria-colindex") || "0", 10) - 1;
    return { row, col };
  };

  private handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "ArrowLeft":
      case "ArrowRight":
        this.handleArrowKeys(event);
        break;
      case "Home":
      case "End":
        this.handleJumpTo(event);
        break;
      default:
    }
  };

  private handleArrowKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    const incrementX = key === "ArrowRight";
    const isX = incrementX || key === "ArrowLeft";
    const incrementY = key === "ArrowDown";
    const isY = incrementY || key === "ArrowUp";

    let { row, col } = this.getPosition(event.target as HTMLDivElement);
    if (isX) {
      col += incrementX ? 1 : -1;
    } else if (isY) {
      row += incrementY ? 1 : -1;
    }

    if (row < 0 || col < 0 || row >= ROW_COUNT || col >= COLUMN_COUNT) {
      return;
    }

    this.setState({ scrollToRow: row, scrollToColumn: col });
  };

  private handleJumpTo = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const isHome = event.key === "Home";
    if (event.ctrlKey) {
      this.setState({
        scrollToRow: isHome ? 0 : ROW_COUNT - 1,
        scrollToColumn: isHome ? 0 : COLUMN_COUNT - 1,
      });
    } else {
      this.setState({
        scrollToColumn: isHome ? 0 : COLUMN_COUNT - 1,
      });
    }
  };

  private handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      this.focus(this.state.scrollToRow, this.state.scrollToColumn);
    }
  };

  private focus = (row: number, column: number) => {
    window.requestAnimationFrame(() => {
      const el = document.getElementById(`cell-${row}-${column}`) as HTMLDivElement | null;
      if (el) {
        el.focus();
      }
    });
  };
}
