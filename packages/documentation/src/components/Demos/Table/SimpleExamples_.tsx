/* eslint-disable */
import React, { FC, Fragment, useState, useRef } from "react";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@react-md/table";
import {
  useScrollListener,
  ResizeObserver,
  ResizeObserverChangeEventHandler,
} from "@react-md/utils";

const rows = [
  [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    "Donec a quam sed nibh porttitor sollicitudin",
  ],
  [
    "Phasellus at odio a nisl condimentum tempus",
    "Nulla eu enim eu lectus lobortis iaculis id sed magna",
  ],
  [
    "Nam quis lectus vel purus dignissim viverra a ut purus",
    "Vivamus vel dui aliquam, cursus odio non, sodales nisi",
  ],
  [
    "Etiam rhoncus tortor vel porttitor euismod",
    "Praesent pulvinar quam id dapibus bibendum",
  ],
  [
    "Suspendisse tincidunt diam nec aliquam ultricies",
    "Etiam hendrerit lorem sed hendrerit sagittis",
  ],
];

type CellWidth = Record<
  number,
  { width: number; transform?: string; WebkitTransform?: string } | undefined
>;

const SimpleExamples: FC = () => {
  const [columnWidths, setColumnWidths] = useState<CellWidth>({});
  const adjust: ResizeObserverChangeEventHandler = ({ element }) => {
    const { cellIndex } = element as HTMLTableDataCellElement;
    setColumnWidths(prevWidths => ({
      ...prevWidths,
      [cellIndex]: { width: element.offsetWidth },
    }));
  };

  const container = useRef<HTMLDivElement | null>(null);
  useScrollListener<HTMLDivElement>({
    enabled: true,
    onScroll(event) {
      const target = event.target as HTMLDivElement;
      if (!target) {
        return;
      }

      const { scrollTop } = target;
      const transform = `translate(0, ${scrollTop}px)`;
      setColumnWidths(prevWidths =>
        Object.entries(prevWidths).reduce(
          (nextState, [index, style]) => ({
            ...nextState,
            [index]: {
              ...style,
              transform,
              WebkitTransform: transform,
              backgroundColor: "var(--rmd-table-fixed-background-color)",
            },
          }),
          {}
        )
      );
    },
    element: container.current,
  });

  return (
    <Fragment>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Column 1</TableCell>
              <TableCell>Column 2</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map(([cell1, cell2], i) => (
              <TableRow key={i}>
                <TableCell>{cell1}</TableCell>
                <TableCell>{cell2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer style={{ height: "15rem" }} ref={container}>
        <Table role="presentation">
          <TableHeader>
            <TableRow>
              <TableCell style={columnWidths[0]}>Column 1</TableCell>
              <TableCell style={columnWidths[1]}>Column 2</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...rows, ...rows, ...rows, ...rows].map(([cell1, cell2], i) => (
              <TableRow key={i}>
                <TableCell>
                  {cell1}
                  {i === 0 && (
                    <ResizeObserver disableHeight onResize={adjust} />
                  )}
                </TableCell>
                <TableCell>
                  {cell2}
                  {i === 0 && (
                    <ResizeObserver disableHeight onResize={adjust} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default SimpleExamples;
