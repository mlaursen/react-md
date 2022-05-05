import type { ReactElement } from "react";
import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import { upperFirst } from "lodash";

import type { TableProps } from "../Table";
import { Table } from "../Table";
import { TableBody } from "../TableBody";
import { TableCell } from "../TableCell";
import type { SortOrder } from "../TableCellContent";
import { TableContainer } from "../TableContainer";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";

function Test(props: TableProps): ReactElement {
  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableCell header>Header</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Cell 1</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe("Table", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<Test />);
    expect(container).toMatchSnapshot();

    rerender(<Test dense hAlign="right" />);
    expect(container).toMatchSnapshot();

    rerender(<Test lineWrap disableHover disableBorders />);
    expect(container).toMatchSnapshot();

    rerender(<Test vAlign="top" fullWidth />);
    expect(container).toMatchSnapshot();

    rerender(
      <TableContainer>
        <Test />
      </TableContainer>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <TableContainer className="test">
        <Test />
      </TableContainer>
    );
    expect(container).toMatchSnapshot();
  });

  it("should allow for sorting", () => {
    interface Dessert {
      name: string;
      calories: number;
      fat: number;
      carbs: number;
      protein: number;
      sodium: number;
      calcium: number;
      iron: number;
      type: "Ice cream" | "Pastry" | "Other";
    }
    type DessertKey = keyof Dessert;

    const desserts: readonly Dessert[] = [
      {
        name: "Frozen yogurt",
        type: "Ice cream",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: 14,
        iron: 1,
      },
      {
        name: "Ice cream sandwich",
        type: "Ice cream",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: 8,
        iron: 1,
      },
      {
        name: "Eclair",
        type: "Pastry",
        calories: 262,
        fat: 16.0,
        carbs: 37,
        protein: 6.0,
        sodium: 337,
        calcium: 6,
        iron: 7,
      },
      {
        name: "Cupcake",
        type: "Pastry",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: 3,
        iron: 8,
      },
      {
        name: "Gingerbread",
        type: "Pastry",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: 7,
        iron: 16,
      },
      {
        name: "Jelly bean",
        type: "Other",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        sodium: 50,
        calcium: 0,
        iron: 0,
      },
      {
        name: "Lollipop",
        type: "Other",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0.0,
        sodium: 38,
        calcium: 0,
        iron: 2,
      },
      {
        name: "Honeycomb",
        type: "Other",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: 0,
        iron: 45,
      },
      {
        name: "Donut",
        type: "Pastry",
        calories: 52,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: 2,
        iron: 22,
      },
      {
        name: "KitKat",
        type: "Other",
        calories: 16,
        fat: 6.0,
        carbs: 65,
        protein: 7.0,
        sodium: 54,
        calcium: 12,
        iron: 6,
      },
    ];

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

    const columns = Object.keys(desserts[0]) as DessertKey[];

    interface SortState {
      data: readonly Dessert[];
      sortKey: DessertKey;
      sortOrder: SortOrder;
    }

    function Test(): ReactElement {
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
            sortOrder =
              prevSortOrder === "ascending" ? "descending" : "ascending";
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
    const { container, getByRole } = render(<Test />);

    const nameColumn = getByRole("columnheader", { name: "Name" });
    const typeColumn = getByRole("columnheader", { name: "Type" });
    expect(nameColumn).toHaveAttribute("aria-sort", "ascending");
    expect(typeColumn).not.toHaveAttribute("aria-sort");
    expect(container).toMatchSnapshot();

    fireEvent.click(getByRole("button", { name: "Name" }));
    expect(nameColumn).toHaveAttribute("aria-sort", "descending");
    expect(typeColumn).not.toHaveAttribute("aria-sort");
    expect(container).toMatchSnapshot();

    fireEvent.click(getByRole("button", { name: "Type" }));
    expect(nameColumn).not.toHaveAttribute("aria-sort");
    expect(typeColumn).toHaveAttribute("aria-sort", "descending");
    expect(container).toMatchSnapshot();

    fireEvent.click(getByRole("button", { name: "Name" }));
    expect(nameColumn).toHaveAttribute("aria-sort", "ascending");
    expect(typeColumn).not.toHaveAttribute("aria-sort");
    expect(container).toMatchSnapshot();
  });
});
