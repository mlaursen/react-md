import React, { FC } from "react";
import { Checkbox, Fieldset, Select, TextField } from "@react-md/form";
import {
  TableCellHorizontalAlignment,
  TableCellVerticalAlignment,
} from "@react-md/table";
import { Grid } from "@react-md/utils";

import { useDefaultStylesContext } from "./context";
import styles from "./TableConfiguration.module.scss";

const horizontals: TableCellHorizontalAlignment[] = ["left", "center", "right"];
const verticals: TableCellVerticalAlignment[] = ["top", "middle", "bottom"];
const lineWrapping = ["true", "false", "padded"];

const TableConfiguration: FC = () => {
  const {
    cols,
    rows,
    dense,
    fullWidth,
    container,
    lineWrap,
    disableHover,
    disableBorders,
    hAlign,
    vAlign,
    row2DisableHover,
    row2DisableBorders,
    col2Grow,
    cellHAlign,
    cellVAlign,
    cellLineWrap,
    onInputChange,
    onNumberChange,
    onSelectChange,
  } = useDefaultStylesContext();

  return (
    <Grid columns={1} largeDesktopColumns={2}>
      <Fieldset legend="Root Table Options">
        <Checkbox
          id="table-grow-col-2"
          name="col2Grow"
          label="Apply grow to column 2"
          checked={col2Grow}
          onChange={onInputChange}
        />
        <Checkbox
          id="table-dense"
          name="dense"
          label="Dense"
          checked={dense}
          onChange={onInputChange}
        />
        <Checkbox
          id="table-full-width"
          name="fullWidth"
          label="Full Width"
          checked={fullWidth}
          onChange={onInputChange}
        />
        <Checkbox
          id="table-container"
          name="container"
          label="Use Container"
          checked={container}
          onChange={onInputChange}
        />
        <Checkbox
          id="table-disable-hover"
          name="disableHover"
          label="Disable Row Hover"
          checked={disableHover}
          onChange={onInputChange}
        />
        <Checkbox
          id="table-disable-borders"
          name="disableBorders"
          label="Disable Row Borders"
          checked={disableBorders}
          onChange={onInputChange}
        />
      </Fieldset>
      <Grid columns={2} phoneColumns={1} padding={0} className={styles.right}>
        <TextField
          id="table-cols"
          name="cols"
          type="number"
          label="Columns"
          theme="underline"
          min={2}
          max={20}
          value={`${cols}`}
          onChange={onNumberChange}
        />
        <TextField
          id="table-rows"
          name="rows"
          type="number"
          label="Rows"
          theme="underline"
          min={3}
          max={30}
          value={`${rows}`}
          onChange={onNumberChange}
        />
        <Select
          id="table-h-align"
          name="hAlign"
          label="Horizontal alignment"
          options={horizontals}
          value={hAlign}
          onChange={onSelectChange}
        />
        <Select
          id="table-v-align"
          name="vAlign"
          label="Vertical alignment"
          options={verticals}
          value={vAlign}
          onChange={onSelectChange}
        />
        <Select
          id="table-line-wrap"
          name="lineWrap"
          label="Line wrap"
          options={lineWrapping}
          value={`${lineWrap}`}
          onChange={onSelectChange}
        />
      </Grid>
      <Fieldset legend="Row 2 Options">
        <Checkbox
          id="table-row-2-disable-hover"
          name="row2DisableHover"
          label="Disable Hover"
          checked={row2DisableHover}
          onChange={onInputChange}
        />
        <Checkbox
          id="table-row-2-disable-borders"
          name="row2DisableBorders"
          label="Disable Borders"
          checked={row2DisableBorders}
          onChange={onInputChange}
        />
      </Fieldset>
      <Fieldset legend="Cell 1-2 Options">
        <Grid columns={2} phoneColumns={1} padding={0} className={styles.right}>
          <Select
            id="table-cell-h-align"
            name="cellHAlign"
            label="Horizontal alignment"
            options={horizontals}
            value={cellHAlign}
            onChange={onSelectChange}
          />
          <Select
            id="table-cell-v-align"
            name="cellVAlign"
            label="Vertical alignment"
            options={verticals}
            value={cellVAlign}
            onChange={onSelectChange}
          />
          <Select
            id="table-cell-line-wrap"
            name="cellLineWrap"
            label="Line wrap"
            options={lineWrapping}
            value={`${cellLineWrap}`}
            onChange={onSelectChange}
          />
        </Grid>
      </Fieldset>
    </Grid>
  );
};

export default TableConfiguration;
