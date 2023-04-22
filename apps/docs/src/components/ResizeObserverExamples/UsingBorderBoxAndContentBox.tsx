import {
  Button,
  randomInt,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useResizeObserver,
  useToggle,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./UsingBorderBoxAndContentBox.module.scss";

// height of table + vertical padding
const DEFAULT_HEIGHT = 240;
// width of table + horizontal padding
const DEFAULT_WIDTH = 252;

interface CurrentSize {
  contentBoxHeight: number;
  contentBoxWidth: number;
  borderBoxHeight: number;
  borderBoxWidth: number;
}

export function UsingBorderBoxAdnContentBox(): ReactElement {
  const { toggled, toggle } = useToggle(false);
  const [currentSize, setCurrentSize] = useState<CurrentSize>({
    contentBoxHeight: DEFAULT_HEIGHT,
    contentBoxWidth: DEFAULT_WIDTH,
    borderBoxHeight: DEFAULT_HEIGHT,
    borderBoxWidth: DEFAULT_WIDTH,
  });

  const nodeRef = useRef<HTMLDivElement>(null);
  const targetRef = useResizeObserver({
    ref: nodeRef,
    onUpdate: useCallback((entry) => {
      setCurrentSize({
        borderBoxHeight: entry.borderBoxSize[0].blockSize,
        borderBoxWidth: entry.borderBoxSize[0].inlineSize,
        contentBoxHeight: entry.contentBoxSize[0].blockSize,
        contentBoxWidth: entry.contentBoxSize[0].inlineSize,
      });
    }, []),
  });

  const [style, setStyle] = useState({
    maxHeight: DEFAULT_HEIGHT,
    maxWidth: DEFAULT_WIDTH,
  });
  useEffect(() => {
    if (!toggled) {
      return;
    }

    let timeout: number | undefined;
    const randomize = (): void => {
      const maxHeight = randomInt({ min: DEFAULT_HEIGHT, max: 500 });
      const maxWidth = randomInt({
        min: DEFAULT_WIDTH,
        max: nodeRef.current?.parentElement?.offsetWidth ?? 300,
      });
      setStyle({ maxHeight, maxWidth });

      timeout = window.setTimeout(
        randomize,
        randomInt({ min: 2, max: 5 }) * 1000
      );
    };

    randomize();

    return () => {
      window.clearTimeout(timeout);
    };
  }, [toggled]);

  const { borderBoxHeight, borderBoxWidth, contentBoxHeight, contentBoxWidth } =
    currentSize;
  return (
    <div className={styles.container}>
      <Button onClick={toggle} theme="primary" themeType="contained">
        {toggled ? "Stop" : "Start"}
      </Button>
      <div ref={targetRef} style={style} className={styles.wrapper}>
        <Table className={styles.table} fullWidth>
          <TableBody>
            <TableRow>
              <TableCell header>Border Box Height:</TableCell>
              <TableCell grow>{borderBoxHeight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell header>Border Box Width:</TableCell>
              <TableCell grow>{borderBoxWidth}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell header>Content Box Height:</TableCell>
              <TableCell grow>{contentBoxHeight}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell header>Content Box Width:</TableCell>
              <TableCell grow>{contentBoxWidth}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
