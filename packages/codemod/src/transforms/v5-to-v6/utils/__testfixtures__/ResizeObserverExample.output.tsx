import { ReactElement, useCallback, useEffect, useRef, useState } from "react";

import {
  Button,
  ResizeObserverEntryCallback,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useResizeObserver,
} from "react-md";

import { randomInt } from "./random";

import styles from "./ResizeObserverExample.module.scss";

const DEFAULT_HEIGHT = 110;
const DEFAULT_WIDTH = 150;

export default function Demo(): ReactElement {
  const [state, setState] = useState({
    enabled: false,
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
    maxHeight: DEFAULT_HEIGHT,
    maxWidth: DEFAULT_WIDTH,
  });
  const { enabled, height, width, maxHeight, maxWidth } = state;

  /**
   * The resize event handler _should_ probably be wrapped with `useCallback` if
   * your resize event handler causes a lot of re-renders since each time the
   * resize handler changes, the resize observer will be re-initiated.
   */
  const handleResize = useCallback<ResizeObserverEntryCallback>(
    entry => {
      const {
        height: height,
        width: width
      } = entry.contentRect;

      setState((prevState) => ({
        ...prevState,
        height,
        width,
      }));
    },
    []
  );
  const ref = useRef<HTMLElement>(null);
  const refHandler = useResizeObserver({
    onUpdate: handleResize,
    ref: ref
  });

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let timeout: number | undefined;
    const randomize = (): void => {
      const maxHeight = randomInt({ min: 100, max: 500 });
      const maxWidth = randomInt({
        min: 150,
        max: ref.current?.offsetWidth ?? 300,
      });
      setState((prevState) => ({
        ...prevState,
        maxHeight,
        maxWidth,
      }));

      timeout = window.setTimeout(
        randomize,
        randomInt({ min: 2, max: 5 }) * 1000
      );
    };

    randomize();

    return () => {
      window.clearTimeout(timeout);
    };
  }, [enabled, ref]);

  return (
    <>
      <Button
        onClick={() => {
          setState((prevState) => ({
            ...prevState,
            enabled: !prevState.enabled,
          }));
        }}
        theme="primary"
        themeType="contained"
        className={styles.button}
      >
        {enabled ? "Stop" : "Start"}
      </Button>
      <div
        style={{ maxHeight, maxWidth }}
        ref={refHandler}
        className={styles.container}
      >
        <Table className={styles.table} fullWidth>
          <TableBody>
            <TableRow>
              <TableCell header>Height:</TableCell>
              <TableCell grow>{height}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell header>Width:</TableCell>
              <TableCell grow>{width}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
