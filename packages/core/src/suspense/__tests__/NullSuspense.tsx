import { describe, expect, it } from "@jest/globals";
import { lazy, type FC, type ReactElement } from "react";
import { act, render, screen, waitFor } from "../../test-utils/index.js";
import { Typography } from "../../typography/Typography.js";
import { NullSuspense } from "../NullSuspense.js";

describe("NullSuspense", () => {
  it("should render nothing as the fallback value", async () => {
    function Content(): ReactElement {
      return <Typography>Hello, world!</Typography>;
    }

    // this is how you can manually resolve a promise using events
    const instance = new EventTarget();
    const FakeLazyComponent = lazy(
      () =>
        new Promise<{ default: FC }>((resolve) => {
          instance.addEventListener("resolve-promise", () => {
            resolve({ default: Content });
          });
        })
    );

    function Test(): ReactElement {
      return (
        <div data-testid="container">
          <NullSuspense>
            <FakeLazyComponent />
          </NullSuspense>
        </div>
      );
    }

    render(<Test />);
    const container = screen.getByTestId("container");
    expect(container).toBeEmptyDOMElement();

    act(() => {
      // resolve the promise
      instance.dispatchEvent(new Event("resolve-promise"));
    });
    await waitFor(() => {
      expect(() => screen.getByText("Hello, world!")).not.toThrow();
    });
  });
});
