"use client";
import {
  dessertColumns,
  desserts,
  type Dessert,
  type DessertKey,
} from "@/constants/desserts.js";
import { cssUtils } from "@react-md/core/cssUtils";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { type SortOrder } from "@react-md/core/table/types";
import { useState, type ReactElement } from "react";

export default function SortableColumnsExample(): ReactElement {
  const { data, sortKey, sortOrder, update } = useSortedColumns();
  return (
    <TableContainer>
      <Table fullWidth>
        <TableHeader>
          <TableRow>
            {dessertColumns.map((name, i) => (
              <TableCell
                key={name}
                aria-sort={name === sortKey ? sortOrder : "none"}
                onClick={() => update(name)}
                grow={i === 0}
                contentProps={{
                  className: cssUtils({ textTransform: "capitalize" }),
                }}
              >
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((dessert) => (
            <TableRow key={dessert.name}>
              {dessertColumns.map((key) => {
                const value = dessert[key];

                return (
                  <TableCell
                    key={key}
                    grow={key === "name"}
                    hAlign={value === "number" ? "right" : undefined}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

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

interface SortState {
  data: readonly Dessert[];
  sortKey: DessertKey;
  sortOrder: SortOrder;
}

interface SortedColumnsHookResult extends SortState {
  update: (sortKey: DessertKey) => void;
}

function useSortedColumns(): SortedColumnsHookResult {
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

  return {
    ...state,
    update,
  };
}
