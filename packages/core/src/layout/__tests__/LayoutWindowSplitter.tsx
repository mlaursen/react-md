import { describe, expect, it } from "@jest/globals";
import type { Ref } from "react";
import { createRef } from "react";
import { rmdRender, screen } from "../../test-utils/index.js";
import type { LayoutWindowSplitterProps } from "../LayoutWindowSplitter.js";
import { LayoutWindowSplitter } from "../LayoutWindowSplitter.js";
import type { ProvidedLayoutWindowSplitterProps } from "../useLayoutWindowSplitter.js";
import { useLayoutWindowSplitter } from "../useLayoutWindowSplitter.js";

type TestProps = Omit<
  LayoutWindowSplitterProps,
  keyof ProvidedLayoutWindowSplitterProps
> & {
  nodeRef?: Ref<HTMLButtonElement>;
};

function Test(props: TestProps) {
  const { nodeRef, ...remaining } = props;
  const { splitterProps } = useLayoutWindowSplitter({
    ref: nodeRef,
  });

  return <LayoutWindowSplitter {...remaining} {...splitterProps} />;
}

describe("LayoutWindowSplitter", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      nodeRef: ref,
      "aria-controls": "does-not-exist",
    } as const;

    const { rerender } = rmdRender(<Test {...props} />);

    const windowSplitter = screen.getByRole("separator", {
      name: "Resize Navigation",
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

    rerender(<Test {...props} aria-labelledby="another-id" />);
    expect(windowSplitter).not.toHaveAttribute("aria-label");
    expect(windowSplitter).toMatchSnapshot();

    rerender(<Test {...props} aria-label="Custom Label" />);
    expect(windowSplitter).toHaveAttribute("aria-label", "Custom Label");
    expect(windowSplitter).toMatchSnapshot();
  });
});
