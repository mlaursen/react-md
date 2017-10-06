/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Grid, Cell } from 'react-md';

const Simple = () => (
  <div>
    <Grid className="grid-example">
      {[...new Array(12)].map((_, i) => <Cell key={i} size={1}>1</Cell>)}
    </Grid>
    <Grid className="grid-example">
      {[...new Array(3)].map((_, i) => <Cell key={i} size={4}>4</Cell>)}
    </Grid>
    <Grid className="grid-example">
      <Cell size={6}>6</Cell>
      <Cell size={4}>4</Cell>
      <Cell size={2}>2</Cell>
    </Grid>
    <Grid className="grid-example">
      <Cell size={6} tabletSize={8}>6 (8 tablet)</Cell>
      <Cell size={4} tabletSize={6}>4 (6 tablet)</Cell>
      <Cell size={2} phoneSize={4}>2 (4 phone)</Cell>
    </Grid>
    <Grid className="grid-example">
      <Cell size={2} offset={3}>Offset 3</Cell>
      <Cell size={2} phoneOffset={1} tabletOffset={3} desktopOffset={2}>
        Phone offset 1, tablet offset 3, desktop offset 2
      </Cell>
    </Grid>
    <Grid className="grid-example">
      <Cell size={2} order={2}>(order 2)</Cell>
      <Cell size={2} order={1}>(order 1)</Cell>
      <Cell size={2} order={0}>(order 0)</Cell>
    </Grid>
  </div>
);

export default Simple;
