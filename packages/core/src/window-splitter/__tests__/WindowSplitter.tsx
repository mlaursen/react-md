import { type Ref, createRef } from "react";
import { describe, expect, it } from "vitest";

import { rmdRender, screen } from "../../test-utils/index.js";
import { WindowSplitter, type WindowSplitterProps } from "../WindowSplitter.js";
import {
  type WindowSplitterWidgetProps,
  useWindowSplitter,
} from "../useWindowSplitter.js";

type TestProps = Omit<WindowSplitterProps, keyof WindowSplitterWidgetProps> & {
  vertical?: boolean;
  nodeRef?: Ref<HTMLButtonElement>;
};

function Test(props: TestProps) {
  const { nodeRef, vertical, ...remaining } = props;
  const { splitterProps } = useWindowSplitter({
    ref: nodeRef,
    min: 0,
    max: 240,
    vertical,
  });

  return (
    <WindowSplitter
      aria-label="Window Splitter"
      {...remaining}
      {...splitterProps}
    />
  );
}

describe("WindowSplitter", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      nodeRef: ref,
      "aria-controls": "does-not-exist",
    } as const;

    const { rerender } = rmdRender(<Test {...props} />);

    const windowSplitter = screen.getByRole("separator", {
      name: "Window Splitter",
    });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(windowSplitter);
    expect(windowSplitter).toMatchSnapshot();

    rerender(
      <Test
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(windowSplitter).toMatchSnapshot();
  });

  it("should be able to render vertically", () => {
    rmdRender(<Test aria-controls="does-not-exist" vertical />);
    const windowSplitter = screen.getByRole("separator", {
      name: "Window Splitter",
    });

    expect(windowSplitter).toMatchSnapshot();
  });
});
