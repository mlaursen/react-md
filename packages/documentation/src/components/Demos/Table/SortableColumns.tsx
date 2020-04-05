import React, { FC, useState } from "react";
import { upperFirst } from "lodash";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@react-md/table";
import desserts, { Dessert } from "constants/desserts";

type DessertKey = keyof Dessert;
type SortOrder = "ascending" | "descending";

interface SortState {
  data: readonly Dessert[];
  sortKey: DessertKey;
  sortOrder: SortOrder;
}

const columns = Object.keys(desserts[0]) as DessertKey[];

/**
 * A custom sort function for the list of desserts.
 */
const sort = (key: DessertKey, ascending: boolean): readonly Dessert[] => {
  const sorted = desserts.slice();
  sorted.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    const value =
      typeof aValue === "number"
        ? aValue - (bValue as number)
        : aValue.localeCompare(bValue as string);

    return value * (ascending ? 1 : -1);
  });

  return sorted;
};

const SortableColumns: FC = () => {
  const [state, setState] = useState<SortState>(() => ({
    data: sort("name", true),
    sortKey: "name",
    sortOrder: "ascending",
  }));

  const update = (sortKey: DessertKey): void => {
    setState((prevState) => {
      const prevSortKey = prevState.sortKey;
      const prevSortOrder = prevState.sortOrder;

      let sortOrder: SortOrder;
      if (sortKey === prevSortKey) {
        // it's the same column, so toggle the sort order
        sortOrder = prevSortOrder === "ascending" ? "descending" : "ascending";
      } else {
        // it's a new column to sort by, so default to ascending for the name column
        // but descending for all the rest.
        sortOrder = sortKey === "name" ? "ascending" : "descending";
      }

      return {
        data: sort(sortKey, sortOrder === "ascending"),
        sortKey,
        sortOrder,
      };
    });
  };

  const { data, sortKey, sortOrder } = state;
  return (
    <TableContainer>
      <Table fullWidth>
        <TableHeader>
          <TableRow>
            {columns.map((name) => (
              <TableCell
                key={name}
                aria-sort={name === sortKey ? sortOrder : "none"}
                onClick={() => update(name)}
              >
                {upperFirst(name)}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((dessert) => (
            <TableRow key={dessert.name}>
              {columns.map((key) => (
                <TableCell
                  key={key}
                  grow={key === "name"}
                  hAlign={
                    typeof dessert[key] === "number" ? "right" : undefined
                  }
                >
                  {dessert[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SortableColumns;
