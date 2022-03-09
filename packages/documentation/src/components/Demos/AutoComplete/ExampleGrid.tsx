import type { ReactElement, ReactNode } from "react";
import { Children } from "react";
import { GridList, GridListCell } from "@react-md/utils";

export default function ExampleGrid({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <GridList maxCellSize={500}>
      {Children.map(children, (child) => (
        <GridListCell clone>{child}</GridListCell>
      ))}
    </GridList>
  );
}
