import React, { FC } from "react";
import cn from "classnames";
import { Grid, GridCell } from "@react-md/utils";

import styles from "./Grid.module.scss";

const GridExample: FC = () => (
  <>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      {Array.from({ length: 12 }, (_, i) => (
        <GridCell key={i} className={styles.item}>{`Cell ${i + 1}`}</GridCell>
      ))}
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      {Array.from({ length: 6 }, (_, i) => (
        <GridCell key={i} className={styles.item} colSpan={2}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      {Array.from({ length: 8 }, (_, i) => (
        <GridCell key={i} className={styles.item} colSpan={3}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      {Array.from({ length: 3 }, (_, i) => (
        <GridCell key={i} className={styles.item} colSpan={4}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      {Array.from({ length: 2 }, (_, i) => (
        <GridCell key={i} className={styles.item} colSpan={5}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      {Array.from({ length: 2 }, (_, i) => (
        <GridCell key={i} className={styles.item} colSpan={6}>
          {`Cell ${i + 1}`}
        </GridCell>
      ))}
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      <GridCell className={styles.item} colSpan={7}>
        Cell 1
      </GridCell>
      <GridCell className={styles.item} colSpan={5}>
        Cell 2
      </GridCell>
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      <GridCell className={styles.item} colSpan={8}>
        Cell 1
      </GridCell>
      <GridCell className={styles.item} colSpan={4}>
        Cell 2
      </GridCell>
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      <GridCell className={styles.item} colSpan={9}>
        Cell 1
      </GridCell>
      <GridCell className={styles.item} colSpan={3}>
        Cell 2
      </GridCell>
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      <GridCell className={styles.item} colSpan={10}>
        Cell 1
      </GridCell>
      <GridCell className={styles.item} colSpan={2}>
        Cell 2
      </GridCell>
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      <GridCell className={styles.item} colSpan={11}>
        Cell 1
      </GridCell>
      <GridCell className={styles.item}>Cell 2</GridCell>
    </Grid>
    <Grid className={cn(styles.grid, styles.smallGrid)}>
      <GridCell className={styles.item} colSpan={12}>
        Cell 1
      </GridCell>
    </Grid>
  </>
);

export default GridExample;
