import { describe, expect, it } from "@jest/globals";
import { lazy, type FC, type ReactElement } from "react";
import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test-utils/index.js";
import { Typography } from "../../typography/Typography.js";
import {
  CircularProgressSuspense,
  type CircularProgressSuspenseProps,
} from "../CircularProgressSuspense.js";

const setup = (props?: Omit<CircularProgressSuspenseProps, "children">) => {
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
        <CircularProgressSuspense {...props}>
          <FakeLazyComponent />
        </CircularProgressSuspense>
      </div>
    );
  }

  render(<Test />);

  return () => {
    act(() => {
      // resolve the promise
      instance.dispatchEvent(new Event("resolve-promise"));
    });
  };
};

describe("CircularProgressSuspense", () => {
  it("should render a CircularProgress as the fallback value", async () => {
    const resolve = setup();

    const progress = await screen.findByRole("progressbar", {
      name: "Loading",
    });
    expect(() => screen.getByText("Hello, world!")).toThrow();

    resolve();
    await waitForElementToBeRemoved(progress);
    expect(() => screen.getByText("Hello, world!")).not.toThrow();
  });

  it("should not provide the loading aria-label if the aria-labelledby prop was provided", async () => {
    const resolve = setup({ "aria-labelledby": "fake-id" });
    const progress = await screen.findByRole("progressbar");
    expect(progress).not.toHaveAttribute("aria-label");
    expect(progress).toHaveAttribute("aria-labelledby", "fake-id");

    // just resolve promises in case it causes issues
    resolve();
    await waitForElementToBeRemoved(progress);
  });

  it("should pass props to the CircularProgress component", async () => {
    const resolve = setup({
      "aria-label": "Custom",
      dense: true,
      className: "custom-class-name",
    });
    const progress = await screen.findByRole("progressbar", { name: "Custom" });

    expect(progress).toMatchSnapshot();

    // just resolve promises in case it causes issues
    resolve();
    await waitForElementToBeRemoved(progress);
  });
});
