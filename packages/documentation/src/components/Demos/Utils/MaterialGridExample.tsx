import React, { FC } from "react";
import { Grid, GridCell } from "@react-md/utils";

import "./Grid.scss";

const GridExample: FC = () => (
  <>
    <Grid className="grid grid--small">
      {Array.from(new Array(12), (_, i) => (
        <GridCell key={i} className="grid__item">{`Cell ${i + 1}`}</GridCell>
      ))}
    </Grid>
    <Grid className="grid grid--small">
      {Array.from(new Array(6), (_, i) => (
        <GridCell key={i} className="grid__item" colSpan={2}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className="grid grid--small">
      {Array.from(new Array(8), (_, i) => (
        <GridCell key={i} className="grid__item" colSpan={3}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className="grid grid--small">
      {Array.from(new Array(3), (_, i) => (
        <GridCell key={i} className="grid__item" colSpan={4}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className="grid grid--small">
      {Array.from(new Array(2), (_, i) => (
        <GridCell key={i} className="grid__item" colSpan={5}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className="grid grid--small">
      {Array.from(new Array(2), (_, i) => (
        <GridCell key={i} className="grid__item" colSpan={6}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className="grid grid--small">
      <GridCell className="grid__item" colSpan={7}>
        Cell 1
      </GridCell>
      <GridCell className="grid__item" colSpan={5}>
        Cell 2
      </GridCell>
    </Grid>
    <Grid className="grid grid--small">
      <GridCell className="grid__item" colSpan={8}>
        Cell 1
      </GridCell>
      <GridCell className="grid__item" colSpan={4}>
        Cell 2
      </GridCell>
    </Grid>
    <Grid className="grid grid--small">
      <GridCell className="grid__item" colSpan={9}>
        Cell 1
      </GridCell>
      <GridCell className="grid__item" colSpan={3}>
        Cell 2
      </GridCell>
    </Grid>
    <Grid className="grid grid--small">
      <GridCell className="grid__item" colSpan={10}>
        Cell 1
      </GridCell>
      <GridCell className="grid__item" colSpan={2}>
        Cell 2
      </GridCell>
    </Grid>
    <Grid className="grid grid--small">
      <GridCell className="grid__item" colSpan={11}>
        Cell 1
      </GridCell>
      <GridCell className="grid__item">Cell 2</GridCell>
    </Grid>
    <Grid className="grid grid--small">
      <GridCell className="grid__item" colSpan={12}>
        Cell 1
      </GridCell>
    </Grid>
  </>
);

export default GridExample;
