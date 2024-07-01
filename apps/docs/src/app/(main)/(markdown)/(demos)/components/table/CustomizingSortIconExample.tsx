import { Table } from "@react-md/core/table/Table";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { type SortOrder } from "@react-md/core/table/types";
import { useToggle } from "@react-md/core/useToggle";
import ChevronLeftIcon from "@react-md/material-icons/ChevronLeftIcon";
import { type ReactElement } from "react";

export default function CustomizingSortIconExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  const sort: SortOrder = toggled ? "ascending" : "descending";
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell aria-sort={sort} sortIconAfter onClick={toggle}>
              Sort Icon After
            </TableCell>
            <TableCell
              aria-sort={sort}
              sortIcon={<ChevronLeftIcon />}
              onClick={toggle}
            >
              Custom Sort Icon
            </TableCell>
            <TableCell
              aria-sort={sort}
              onClick={toggle}
              iconRotatorProps={{
                disableTransition: true,
              }}
            >
              Disable Rotate Transition
            </TableCell>
          </TableRow>
        </TableHeader>
      </Table>
    </TableContainer>
  );
}
