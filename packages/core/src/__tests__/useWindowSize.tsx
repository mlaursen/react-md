import { beforeAll, beforeEach, describe, expect, it } from "@jest/globals";
import { createRef, type MutableRefObject, type ReactElement } from "react";
import { act } from "react-dom/test-utils";
import { SsrProvider } from "../SsrProvider.js";
import { render, screen, waitFor } from "../test-utils/index.js";
import { type ElementSize } from "../types.js";
import { useWindowSize, type WindowSizeOptions } from "../useWindowSize.js";

const getValue = (element: HTMLElement): number =>
  parseFloat(element.textContent || "");

interface TestProps extends WindowSizeOptions {
  initialRef?: MutableRefObject<ElementSize | null>;
}

function Test(props: TestProps): ReactElement {
  const { initialRef, ...options } = props;

  const { height, width } = useWindowSize(options);
  if (initialRef && !initialRef.current) {
    initialRef.current = { height, width };
  }

  return (
    <>
      <div data-testid="height">{height}</div>
      <div data-testid="width">{width}</div>
    </>
  );
}

let HEIGHT: number;
let WIDTH: number;
beforeAll(() => {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
});

beforeEach(() => {
  window.innerHeight = HEIGHT;
  window.innerWidth = WIDTH;
});

describe("useWindowSize", () => {
  it("should default to Infinity when in ssr mode", async () => {
    // disable throttle so don't need to await the throttled hydration
    const initialRef = createRef<ElementSize | null>();
    render(
      <SsrProvider ssr>
        <Test initialRef={initialRef} />
      </SsrProvider>
    );

    expect(initialRef.current).toEqual({
      height: Infinity,
      width: Infinity,
    });

    const height = screen.getByTestId("height");
    const width = screen.getByTestId("width");
    await waitFor(() => {
      expect(getValue(height)).toBe(HEIGHT);
    });
    expect(getValue(width)).toBe(WIDTH);
  });

  it("should default to the window size when not in ssr mode", () => {
    const initialRef = createRef<ElementSize | null>();
    render(
      <SsrProvider>
        <Test initialRef={initialRef} />
      </SsrProvider>
    );

    expect(initialRef.current).toEqual({
      height: HEIGHT,
      width: WIDTH,
    });

    const height = screen.getByTestId("height");
    const width = screen.getByTestId("width");
    expect(getValue(height)).toBe(HEIGHT);
    expect(getValue(width)).toBe(WIDTH);
  });

  it("should support disabling updating when only the height changes", () => {
    render(<Test throttle={false} disableHeight />);
    const height = screen.getByTestId("height");
    const width = screen.getByTestId("width");
    expect(getValue(height)).toBe(HEIGHT);
    expect(getValue(width)).toBe(WIDTH);

    act(() => {
      window.innerHeight = 1000;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getValue(height)).toBe(HEIGHT);
    expect(getValue(width)).toBe(WIDTH);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getValue(height)).toBe(1000);
    expect(getValue(width)).toBe(800);
  });

  it("should support disabling updating when only the width changes", () => {
    render(<Test throttle={false} disableWidth />);
    const height = screen.getByTestId("height");
    const width = screen.getByTestId("width");
    expect(getValue(height)).toBe(HEIGHT);
    expect(getValue(width)).toBe(WIDTH);

    act(() => {
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getValue(height)).toBe(HEIGHT);
    expect(getValue(width)).toBe(WIDTH);

    act(() => {
      window.innerHeight = 1000;
      window.dispatchEvent(new Event("resize"));
    });
    expect(getValue(height)).toBe(1000);
    expect(getValue(width)).toBe(800);
  });
});
