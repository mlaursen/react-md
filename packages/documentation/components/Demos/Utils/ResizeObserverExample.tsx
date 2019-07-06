import React, { Fragment, FC, useEffect, useRef, useState } from "react";
import { Button } from "@react-md/button";
import { bem } from "@react-md/theme";
import {
  ResizeObserver,
  ResizeObserverChangeEventHandler,
  useToggle,
} from "@react-md/utils";

import { randomInt } from "utils/random";

import "./ResizeObserverExample.scss";

const block = bem("simple-resize");
const DEFAULT_HEIGHT = 100;
const DEFAULT_WIDTH = 150;

/**
 * This hook is used to handle the resize events from the `ResizeObserver`. This will update the
 * table values with the current `height` and `width` while the new sizes are animating.
 */
function useSize() {
  const [size, setSize] = useState({
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WIDTH,
  });

  const onResize: ResizeObserverChangeEventHandler = event => {
    const { height, width } = event;
    setSize({ height, width });
  };

  const { height, width } = size;
  return {
    height,
    width,
    onResize,
  };
}

/**
 * This hook will create a random style for the container element so that
 * the `maxHeight` and `maxWidth` can be animated. It'll stop and start
 * when the `enabled` value is toggled.
 */
function useRandomStyle(enabled: boolean) {
  const [style, setStyle] = useState({
    maxHeight: DEFAULT_HEIGHT,
    maxWidth: DEFAULT_WIDTH,
  });

  const timeout = useRef<number | undefined>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const randomize = () => {
      const maxHeight = randomInt({ min: 100, max: 500 });
      const maxWidth = randomInt({
        min: 150,
        max: containerRef.current ? containerRef.current.offsetWidth : 300,
      });

      setStyle({ maxHeight, maxWidth });
      timeout.current = window.setTimeout(
        randomize,
        randomInt({ min: 2, max: 8 }) * 1000
      );
    };

    randomize();

    return () => {
      window.clearTimeout(timeout.current);
    };
  }, [enabled]);

  return { style, containerRef };
}

const SimpleExample: FC = () => {
  const { toggled: enabled, toggle } = useToggle(false);
  const { style, containerRef } = useRandomStyle(enabled);
  const { height, width, onResize } = useSize();

  return (
    <Fragment>
      <Button
        id="start-resizing"
        onClick={toggle}
        theme="primary"
        themeType="contained"
        className={block("toggle")}
      >
        {enabled ? "Stop" : "Start"}
      </Button>
      <div ref={containerRef} className={block()} style={style}>
        <ResizeObserver onResize={onResize} />
        <table className={block("table")}>
          <tbody>
            <tr>
              <th scope="row" className={block("th")}>
                height:
              </th>
              <td className={block("td")}>{height}</td>
            </tr>
            <tr>
              <th scope="row" className={block("th")}>
                width:
              </th>
              <td className={block("td")}>{width}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default SimpleExample;
