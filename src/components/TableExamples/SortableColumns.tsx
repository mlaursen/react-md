import type { SortOrder } from "@react-md/table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@react-md/table";
import { upperFirst } from "lodash";
import type { ReactElement } from "react";
import { useState } from "react";
import type { Dessert } from "src/constants/desserts";
import { DESSERTS } from "src/constants/desserts";

type DessertKey = keyof Dessert;

interface SortState {
  data: readonly Dessert[];
  sortKey: DessertKey;
  sortOrder: SortOrder;
}

const columns = Object.keys(DESSERTS[0]) as DessertKey[];

/**
 * A custom sort function for the list of desserts.
 */
const sort = (key: DessertKey, ascending: boolean): readonly Dessert[] => {
  const sorted = DESSERTS.slice();
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

export function SortableColumns(): ReactElement {
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
}
