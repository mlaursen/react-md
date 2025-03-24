import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { type ReactElement, type ReactNode } from "react";

import { Button } from "../../button/Button.js";
import { render, screen, userEvent } from "../../test-utils/index.js";
import { useToggle } from "../../useToggle.js";
import { ErrorBoundary, type ErrorBoundaryProps } from "../ErrorBoundary.js";
import { useErrorBoundary } from "../useErrorBoundary.js";

function ErrorOnMount(): ReactElement {
  throw new Error("Uh oh!");
}

type TestProps = Omit<ErrorBoundaryProps, "fallback" | "children">;

function ErrorOnMountTest(props: TestProps): ReactElement {
  return (
    <ErrorBoundary
      {...props}
      fallback={<span data-testid="fallback">Fallback!</span>}
    >
      <ErrorOnMount />
    </ErrorBoundary>
  );
}

function ErrorAfterClick({ name = "Button" }: { name?: string }): ReactElement {
  const { toggle, toggled } = useToggle();

  if (toggled) {
    throw new Error("Unable to parse mdx");
  }

  return <Button onClick={toggle}>{name}</Button>;
}

function ErrorOnUpdateTest({
  fallback,
  ...props
}: TestProps & { fallback?: ReactNode }): ReactElement {
  return (
    <ErrorBoundary
      {...props}
      fallback={fallback ?? <span data-testid="fallback">Fallback!</span>}
    >
      <ErrorAfterClick />
    </ErrorBoundary>
  );
}

const error = jest.spyOn(console, "error");
beforeAll(() => {
  // hide error messages
  error.mockImplementation(() => {});
});

describe("ErrorBoundary", () => {
  it("should be able to capture errors without crashing the entire app", () => {
    expect(() => render(<ErrorOnMountTest />)).not.toThrow();
  });

  it("should display the fallback if the component mounts with an error", () => {
    render(<ErrorOnMountTest />);
    const fallback = screen.getByTestId("fallback");
    expect(fallback).toHaveTextContent("Fallback!");
  });

  it("should be able to display the fallback if a new render causes an error", async () => {
    const user = userEvent.setup();
    render(<ErrorOnUpdateTest />);
    const button = screen.getByRole("button", { name: "Button" });

    await user.click(button);
    expect(() => screen.getByTestId("fallback")).not.toThrow();
  });

  it("should allow trying to reset the error using the useErrorBoundary hook from the fallback component to handle nested failures", async () => {
    const user = userEvent.setup();
    function SaveableChild(): ReactElement {
      const { error, errored, reset } = useErrorBoundary();
      if (errored) {
        return (
          <span data-testid="error">
            <pre data-testid="full-error">
              <code>{error.stack ?? error.message}</code>
            </pre>
            <Button onClick={reset}>Reset Error</Button>
          </span>
        );
      }

      return <span data-testid="impossible" />;
    }

    function SaveableChildError(): ReactElement {
      return (
        <ErrorBoundary fallback={<SaveableChild />}>
          <ErrorAfterClick name="First Error" />
        </ErrorBoundary>
      );
    }

    function ReallyBroke(): ReactElement {
      const { toggle, toggled } = useToggle();
      if (toggled) {
        throw new Error("This really broke");
      }

      return <Button onClick={toggle}>Really Broke</Button>;
    }

    function Test(): ReactElement {
      return (
        <ErrorBoundary
          fallback={<span data-testid="broke">Wow, this is really broke</span>}
        >
          <SaveableChildError />
          <ReallyBroke />
        </ErrorBoundary>
      );
    }

    render(<Test />);

    const reallyBroke = screen.getByRole("button", { name: "Really Broke" });
    const firstError = screen.getByRole("button", { name: "First Error" });

    await user.click(firstError);
    expect(reallyBroke).toBeInTheDocument();
    expect(firstError).not.toBeInTheDocument();
    expect(() => screen.getByTestId("full-error")).not.toThrow();

    const resetError = screen.getByRole("button", { name: "Reset Error" });
    await user.click(resetError);
    expect(() => screen.getByTestId("broke")).toThrow();
    expect(reallyBroke).toBeInTheDocument();
    expect(firstError).not.toBeInTheDocument();
    expect(resetError).not.toBeInTheDocument();

    await user.click(reallyBroke);
    expect(() => screen.getByTestId("broke")).not.toThrow();
  });

  it("should allow for an onError callback", async () => {
    const user = userEvent.setup();
    const onError = jest.fn();
    render(<ErrorOnUpdateTest onError={onError} />);
    expect(onError).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Button" }));
    expect(onError).toHaveBeenCalledTimes(1);
  });
});
