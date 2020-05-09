import React, { FC } from "react";
import cn from "classnames";
import { Checkbox, Fieldset, TextField, useChecked } from "@react-md/form";
import { bem, Grid, GridList, GridListCell } from "@react-md/utils";

import useNumberField from "hooks/useNumberField";

import "./Grid.scss";
import "./SimpleGridList.scss";

const block = bem("simple-grid-list");

const SimpleGridList: FC = () => {
  const [cells, cellsProps] = useNumberField({
    defaultValue: 20,
    min: 0,
    max: 120,
  });
  const [maxCellSize, maxCellSizeProps] = useNumberField({
    defaultValue: 150,
    min: 120,
    max: 300,
  });
  const [cellMargin, cellMarginProps] = useNumberField({
    defaultValue: 8,
    min: 0,
    max: 48,
  });

  const [containerPadding, containerPaddingProps] = useNumberField({
    defaultValue: 16,
    min: 0,
    max: 48,
  });

  const [restricted, handleRestrictedChange] = useChecked(true);

  return (
    <>
      <Fieldset legend="GridList options">
        <Grid minCellWidth="9rem">
          <TextField
            id="simple-grid-list-cell-count"
            label="Number of cells"
            {...cellsProps}
          />
          <TextField
            id="simple-grid-list-cell-size"
            label="Max cell width (px)"
            {...maxCellSizeProps}
          />
          <TextField
            id="simple-grid-list-cell-margin"
            label="Cell margin (px)"
            {...cellMarginProps}
          />
          <TextField
            id="simple-grid-list-grid-padding"
            label="Grid padding (px)"
            {...containerPaddingProps}
          />
        </Grid>
        <Checkbox
          id="simple-grid-list-disable-height"
          name="disableHeight"
          label="Restrict height"
          checked={restricted}
          onChange={handleRestrictedChange}
        />
      </Fieldset>
      <div className={cn(block({ restricted }), "grid")}>
        <GridList
          style={{
            padding: containerPadding > 0 ? containerPadding / 2 : 0,
          }}
          cellMargin={`${cellMargin}px`}
          maxCellSize={maxCellSize}
          containerPadding={containerPadding}
        >
          {Array.from(new Array(cells), (_, i) => (
            <GridListCell key={i} square className="grid__item">
              {`Cell ${i + 1}`}
            </GridListCell>
          ))}
        </GridList>
      </div>
    </>
  );
};

export default SimpleGridList;
