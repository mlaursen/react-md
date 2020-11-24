import React, { FC } from "react";
import cn from "classnames";
import {
  Checkbox,
  Fieldset,
  TextFieldWithMessage,
  useChecked,
  useNumberField,
} from "@react-md/form";
import { Grid, GridList, GridListCell } from "@react-md/utils";

import gridStyles from "./Grid.module.scss";
import styles from "./SimpleGridList.module.scss";

const SimpleGridList: FC = () => {
  const [cells, cellsProps] = useNumberField({
    id: "simple-grid-list-cell-count",
    min: 0,
    max: 120,
    defaultValue: 20,
  });
  const [maxCellSize, maxCellSizeProps] = useNumberField({
    id: "simple-grid-list-cell-size",
    min: 120,
    max: 300,
    defaultValue: 150,
  });
  const [cellMargin, cellMarginProps] = useNumberField({
    id: "simple-grid-list-cell-margin",
    min: 0,
    max: 48,
    defaultValue: 8,
  });

  const [containerPadding, containerPaddingProps] = useNumberField({
    id: "simple-grid-list-grid-padding",
    min: 0,
    max: 48,
    defaultValue: 16,
  });

  const [restricted, handleRestrictedChange] = useChecked(true);

  return (
    <>
      <Fieldset legend="GridList options">
        <Grid minCellWidth="9rem">
          <TextFieldWithMessage label="Number of cells" {...cellsProps} />
          <TextFieldWithMessage
            label="Max cell width (px)"
            {...maxCellSizeProps}
          />
          <TextFieldWithMessage label="Cell margin (px)" {...cellMarginProps} />
          <TextFieldWithMessage
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
      <div
        className={cn(
          styles.container,
          {
            [styles.restricted]: restricted,
          },
          gridStyles.grid
        )}
      >
        <GridList
          style={{
            padding: containerPadding > 0 ? containerPadding / 2 : 0,
          }}
          cellMargin={`${cellMargin}px`}
          maxCellSize={maxCellSize}
          containerPadding={containerPadding}
        >
          {Array.from({ length: cells }, (_, i) => (
            <GridListCell key={i} square className={gridStyles.item}>
              {`Cell ${i + 1}`}
            </GridListCell>
          ))}
        </GridList>
      </div>
    </>
  );
};

export default SimpleGridList;
