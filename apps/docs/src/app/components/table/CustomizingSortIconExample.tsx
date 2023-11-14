import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  useToggle,
  type SortOrder,
} from "@react-md/core";
import ChevronLeftIcon from "@react-md/material-icons/ChevronLeftIcon";
import { type ReactElement } from "react";

export default function CustomizingSortIconExample(): ReactElement {
  const { toggled, toggle } = useToggle();
  const sort: SortOrder = toggled ? "ascending" : "descending";
  return (
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
  );
}
