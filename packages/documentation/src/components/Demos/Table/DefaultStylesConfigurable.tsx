import React, { FC, useState, Fragment } from "react";
import {
  TableCellConfig,
  TableProps,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@react-md/table";
import { Fieldset, Checkbox, TextField, Select } from "@react-md/form";

interface StyledTableProps extends TableProps {
  rows: number;
  cols: number;
}

const StyledTable: FC<StyledTableProps> = ({ rows, cols, ...props }) => (
  <Table {...props}>
    <TableHeader>
      <TableRow>
        {Array.from(new Array(cols), (_, i) => (
          <TableCell key={i}>{`Header ${i + 1}`}</TableCell>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from(new Array(rows), (_, i) => (
        <TableRow key={i}>
          {Array.from(new Array(cols), (_, j) => (
            <TableCell key={j}>{`Cell ${i + 1}-${j + 1}`}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

type HorizontalAlignment = Required<TableCellConfig>["hAlign"];
type VerticalAlignment = Required<TableCellConfig>["vAlign"];

const horizontals: HorizontalAlignment[] = ["left", "center", "right"];
const verticals: VerticalAlignment[] = ["top", "middle", "bottom"];

const DefaultStylesConfigurable: FC = () => {
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(8);
  const [dense, setDense] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);
  const [container, setContainer] = useState(false);
  const [disableHover, setDisableHover] = useState(false);
  const [disableBorders, setDisableBorders] = useState(false);
  const [hAlign, setHAlign] = useState<HorizontalAlignment>("left");
  const [vAlign, setVAlign] = useState<VerticalAlignment>("middle");

  const table = (
    <StyledTable
      rows={rows}
      cols={cols}
      dense={dense}
      fullWidth={fullWidth}
      disableHover={disableHover}
      disableBorders={disableBorders}
      hAlign={hAlign}
      vAlign={vAlign}
    />
  );

  return (
    <Fragment>
      <TextField
        id="table-num-cols"
        name="cols"
        type="number"
        label="Columns"
        value={`${cols}`}
        onChange={event => {
          const { value } = event.currentTarget;

          setCols(Math.min(15, Math.max(2, parseInt(value, 10))));
        }}
      />
      <TextField
        id="table-num-rows"
        name="rows"
        type="number"
        label="Rows"
        value={`${rows}`}
        onChange={event => {
          const { value } = event.currentTarget;

          setRows(Math.min(40, Math.max(2, parseInt(value, 10))));
        }}
      />
      <Fieldset legend="Root Table Options">
        <Checkbox
          id="table-dense"
          name="dense"
          label="Dense"
          checked={dense}
          onChange={event => setDense(event.currentTarget.checked)}
        />
        <Checkbox
          id="table-full-width"
          name="fullWidth"
          label="Full Width"
          checked={fullWidth}
          onChange={event => setFullWidth(event.currentTarget.checked)}
        />
        <Checkbox
          id="table-container"
          name="container"
          label="Use Container"
          checked={container}
          onChange={event => setContainer(event.currentTarget.checked)}
        />
        <Checkbox
          id="table-disable-hover"
          name="disableHover"
          label="Disable Row Hover"
          checked={disableHover}
          onChange={event => setDisableHover(event.currentTarget.checked)}
        />
        <Checkbox
          id="table-disable-borders"
          name="disableBorders"
          label="Disable Row Borders"
          checked={disableBorders}
          onChange={event => setDisableBorders(event.currentTarget.checked)}
        />
        <Select
          id="table-h-align"
          label="Horizontal Alignment"
          options={horizontals}
          value={hAlign}
          onChange={nextAlign => setHAlign(nextAlign as HorizontalAlignment)}
        />
        <Select
          id="table-v-align"
          label="Vertical Alignment"
          options={verticals}
          value={vAlign}
          onChange={nextAlign => setVAlign(nextAlign as VerticalAlignment)}
        />
      </Fieldset>
      {container ? <TableContainer>{table}</TableContainer> : table}
    </Fragment>
  );
};

export default DefaultStylesConfigurable;
