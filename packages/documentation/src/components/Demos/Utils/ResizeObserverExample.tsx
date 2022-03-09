import type { ReactElement } from "react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@react-md/button";
import { Table, TableBody, TableCell, TableRow } from "@react-md/table";
import type { OnResizeObserverChange } from "@react-md/utils";
import { useResizeObserver } from "@react-md/utils";

import { randomInt } from "utils/random";

import styles from "./ResizeObserverExample.module.scss";

const DEFAULT_HEIGHT = 110;
const DEFAULT_WIDTH = 150;

export default function ResizeObserverExample(): ReactElement {
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
  const handleResize = useCallback<OnResizeObserverChange>(
    ({
      height,
      width,
      /* element, */
      /* scrollHeight, */
      /* scrollWidth, */
    }) => {
      setState((prevState) => ({
        ...prevState,
        height,
        width,
      }));
    },
    []
  );
  const [ref, refHandler] = useResizeObserver(handleResize, {
    // an optional ref that will be merged with the `refHandler` if you need to
    // merge multiple refs together
    /* ref: anotherRef, */
    // boolean if the `handleResize` should not be called if only the height has
    // changed
    /* disableHeight: true, */
    // boolean if the `handleResize` should not be called if only the width has
    // changed
    /* disableWidth: true, */
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
