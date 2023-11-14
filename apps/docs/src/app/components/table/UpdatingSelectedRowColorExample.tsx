import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  cssUtils,
  type UseStateSetter,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { useState, type ReactElement } from "react";
import styles from "./UpdatingSelectedRowColorExample.module.scss";

export default function UpdatingSelectedRowColorExample(): ReactElement {
  const [selectedRow, setSelectedRow] = useState(0);
  return (
    <Table className={styles.table}>
      <TableBody>
        <CustomSelectedRow
          rowIndex={0}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
        <CustomSelectedRow
          rowIndex={1}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
        <CustomSelectedRow
          rowIndex={2}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      </TableBody>
    </Table>
  );
}

interface CustomSelectedRowProps {
  rowIndex: number;
  selectedRow: number;
  setSelectedRow: UseStateSetter<number>;
}

function CustomSelectedRow(props: CustomSelectedRowProps): ReactElement {
  const { rowIndex, selectedRow, setSelectedRow } = props;

  const selected = rowIndex === selectedRow;
  const onChange = (): void => {
    setSelectedRow(rowIndex);
  };
  return (
    <TableRow
      onClick={onChange}
      selected={selected}
      className={cssUtils({
        className: cnb(selected && styles.selected),
        backgroundColor: selected ? "primary" : undefined,
      })}
      clickable
    >
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
    </TableRow>
  );
}
