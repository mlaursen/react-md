import { describe, expect, it } from "@jest/globals";
import { type ReactElement } from "react";
import { render, screen } from "test-utils";

import { NoSsr } from "../NoSsr.js";
import { SsrProvider, useSsr } from "../SsrProvider.js";

function Content(): ReactElement {
  return <p>Some Text</p>;
}

describe("NoSsr", () => {
  it("should always render the children if the SsrProvider has not been initialized", () => {
    function Content(): ReactElement {
      return <p>Some Text</p>;
    }

    render(
      <NoSsr>
        <Content />
      </NoSsr>
    );

    expect(() => screen.getByText("Some Text")).not.toThrow();
  });

  it("should always render the children if ssr mode has not been initialized", () => {
    render(
      <SsrProvider>
        <NoSsr>
          <Content />
        </NoSsr>
      </SsrProvider>
    );

    expect(() => screen.getByText("Some Text")).not.toThrow();
  });

  // I don't really know how to test this part
  it("should not render anything initially if ssr mode is enabled", () => {
    const parentRenderCount = { current: 0 };
    const childRenderCount = { current: 0 };
    const nestedChildRenderCount = { current: 0 };

    // TODO: FIgure out how to actually test this part. I want to show that nested `NoSsr` do nothing
    function NestedChild(): ReactElement {
      return (
        <p>{`Nested child rendered: ${nestedChildRenderCount.current++}`}</p>
      );
    }

    function Child(): ReactElement {
      return (
        <>
          <p>{`Child rendered: ${childRenderCount.current++}`}</p>
          <NoSsr>
            <NestedChild />
          </NoSsr>
        </>
      );
    }

    function Test(): ReactElement {
      const ssr = useSsr();

      // I'm surprised this works
      expect(ssr).toBe(parentRenderCount.current === 0);

      return (
        <>
          <p>{`Parent rendered: ${parentRenderCount.current++}`}</p>
          <NoSsr>
            <Child />
          </NoSsr>
        </>
      );
    }

    render(
      <SsrProvider ssr>
        <Test />
      </SsrProvider>
    );

    expect(parentRenderCount.current).toBe(2);
    expect(childRenderCount.current).toBe(1);
    expect(nestedChildRenderCount.current).toBe(1);
  });
});
