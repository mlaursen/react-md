import React, { FC, Children } from "react";
import { GridList, GridListCell } from "@react-md/utils";

const ExampleGrid: FC = ({ children }) => (
  <GridList maxCellSize={500}>
    {Children.map(children, child => (
      <GridListCell clone>{child}</GridListCell>
    ))}
  </GridList>
);

export default ExampleGrid;
