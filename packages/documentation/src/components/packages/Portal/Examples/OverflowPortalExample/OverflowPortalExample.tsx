import * as React from "react";
import { Button } from "@react-md/button";
import { Text } from "@react-md/typography";
import { Grid, GridCellProps, AutoSizer, ArrowKeyStepper, ScrollIndices } from "react-virtualized";
import { Tooltip } from "@react-md/tooltip";

import "./overflow-portal-example.scss";
import Cell from "./Cell";

export interface IOverflowPortalExampleProps {}

export interface IOverflowPortalExampleState {
  portal: boolean;
  scrollToRow: number;
  scrollToColumn: number;
}

const ROW_COUNT = 100;
const COLUMN_COUNT = 100;

export default class OverflowPortalExample extends React.Component<
  IOverflowPortalExampleProps,
  IOverflowPortalExampleState
> {
  private grid: React.RefObject<Grid>;
  constructor(props: IOverflowPortalExampleProps) {
    super(props);

    this.state = { portal: false, scrollToRow: 0, scrollToColumn: 0 };
    this.grid = React.createRef();
  }

  public render() {
    return (
      <React.Fragment>
        <Text type="body-2">
          This example will show a very basic example of how you can use portals to fix overflow
          rendering issues. If you set any of the overflow values (<code>overflow</code>,{" "}
          <code>overflow-x</code>, <code>overflow-y</code>) to any value other than{" "}
          <code>visible</code>, elements that are positioned absolute or fixed will no longer be
          visible. This can be seen below with the default usage of the <code>RelativeTooltip</code>{" "}
          component. The tooltips will display correctly until you attempt to view a tooltip in the
          last 60px of the scroll area. It can be visible if you manually scroll a bit, but that
          isn't great UX.
        </Text>
        <Text type="body-2">
          To get around this issue, you can use portals to render these "temporary" elements outside
          of the scroll area and apply some positioning logic to render the "temporary" element near
          the desired element. If you enable the portal view by clicking the toggle button below,
          the portals will be enabled with some extremely simple positioning logic. This is actually
          how the <code>MagicTooltip</code> component works behind the scenes but with a bit more
          positioning logic and animations added.
        </Text>
        <Text type="caption" component="blockquote">
          NOTE: The example below only has mouse interactions enabled to keep things simple with
          react-virtualized.
        </Text>
        <div className="overflow-portal-example">
          <ArrowKeyStepper
            columnCount={COLUMN_COUNT}
            rowCount={ROW_COUNT}
            mode="cells"
            onScrollToChange={this.selectCell}
            scrollToRow={this.state.scrollToRow}
            scrollToColumn={this.state.scrollToColumn}
          >
            {({ onSectionRendered, scrollToColumn, scrollToRow }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <Grid
                    ref={this.grid}
                    height={300}
                    width={width}
                    rowHeight={48}
                    rowCount={ROW_COUNT}
                    columnCount={COLUMN_COUNT}
                    columnWidth={100}
                    scrollToRow={scrollToRow}
                    scrollToColumn={scrollToColumn}
                    cellRenderer={(props: GridCellProps) => {
                      const { columnIndex, rowIndex } = props;
                      return (
                        <Cell
                          {...props}
                          active={columnIndex === scrollToColumn && rowIndex === scrollToRow}
                          portal={this.state.portal}
                        />
                      );
                    }}
                    onSectionRendered={onSectionRendered}
                  />
                )}
              </AutoSizer>
            )}
          </ArrowKeyStepper>
        </div>
        <span id="overflow-portal-example-tooltip-container" />
        <Button
          id="toggle-overflow-tooltip-portals"
          onClick={this.togglePortals}
          themeType="outline"
        >
          Toggle Tooltip Portals
        </Button>
      </React.Fragment>
    );
  }

  private selectCell = ({ scrollToRow, scrollToColumn }: ScrollIndices) => {
    this.setState({ scrollToRow, scrollToColumn });
  };

  private togglePortals = () => {
    this.setState(
      prevState => ({ portal: !prevState.portal }),
      () => {
        if (this.grid.current) {
          this.grid.current.forceUpdate();
        }
      }
    );
  };
}
