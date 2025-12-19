import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { FontIcon } from "../../icon/FontIcon.js";
import {
  act,
  rmdRender,
  screen,
  userEvent,
  waitFor,
  within,
} from "../../test-utils/index.js";
import { AsyncButton, type AsyncButtonProps } from "../AsyncButton.js";

describe("AsyncButton", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Button",
    } as const;

    const { rerender } = rmdRender(<AsyncButton {...props} />);

    const element = screen.getByRole("button", { name: "Button" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <AsyncButton
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should render a progressbar until the onClick's promise has been resolved if it returns a promise", async () => {
    const user = userEvent.setup();

    // this is how you can manually resolve a promise using events
    const instance = new EventTarget();
    const onClick = vi.fn(() => {
      return new Promise<void>((resolve) => {
        instance.addEventListener("resolve-promise", () => {
          resolve();
        });
      });
    });

    const { unmount } = rmdRender(
      <AsyncButton onClick={onClick}>Button</AsyncButton>
    );
    const button = screen.getByRole("button", { name: "Button" });
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(() => within(button).getByRole("progressbar")).toThrowError();
    expect(button).toMatchSnapshot();

    await user.click(button);

    expect(button).toHaveAttribute("aria-disabled", "true");
    expect(button).toBeEnabled();
    expect(() => within(button).getByRole("progressbar")).not.toThrowError();
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toMatchSnapshot();

    act(() => {
      // resolve the promise
      instance.dispatchEvent(new Event("resolve-promise"));
    });
    await waitFor(() => {
      expect(button).not.toHaveAttribute("aria-disabled");
    });
    await waitFor(() => {
      expect(button).toBeEnabled();
    });
    expect(() => within(button).getByRole("progressbar")).toThrowError();

    await user.click(button);
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(2);

    unmount();

    act(() => {
      instance.dispatchEvent(new Event("resolve-promise"));
    });
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("should resolve immediately no onClick handler is provided or the onClick handler's result is not a promise", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<AsyncButton>Button</AsyncButton>);

    const button = screen.getByRole("button", { name: "Button" });
    await user.click(button);

    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).toBeEnabled();
    expect(() => within(button).getByRole("progressbar")).toThrowError();

    const onClick = vi.fn(() => {});
    rerender(<AsyncButton onClick={onClick}>Button</AsyncButton>);
    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).not.toHaveAttribute("aria-disabled");
    expect(button).toBeEnabled();
    expect(() => within(button).getByRole("progressbar")).toThrowError();
  });

  it("should display the loading spinner if the loading prop is true", () => {
    const { rerender } = rmdRender(<AsyncButton loading>Button</AsyncButton>);
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => within(button).getByRole("progressbar")).not.toThrowError();

    rerender(<AsyncButton loading={false}>Button</AsyncButton>);
    expect(() => within(button).getByRole("progressbar")).toThrowError();
  });

  it("should should be able to render a linear progress bar above or below the content", () => {
    const { rerender } = rmdRender(
      <AsyncButton loading loadingType="linear-above">
        Button
      </AsyncButton>
    );

    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toMatchSnapshot();

    rerender(
      <AsyncButton loading loadingType="linear-below">
        Button
      </AsyncButton>
    );
    expect(button).toMatchSnapshot();
  });

  it("should be able to render a circular progress bar before or after and replacing the optional addon", () => {
    const props: AsyncButtonProps = {
      loadingType: "circular-before",
      beforeAddon: <FontIcon>favorite</FontIcon>,
      afterAddon: <FontIcon>remove</FontIcon>,
      children: "Button",
    };
    const { rerender } = rmdRender(<AsyncButton {...props} />);

    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toMatchSnapshot();

    rerender(<AsyncButton {...props} loading />);
    expect(button).toMatchSnapshot();

    rerender(<AsyncButton {...props} loadingType="circular-after" />);
    expect(button).toMatchSnapshot();

    rerender(<AsyncButton {...props} loadingType="circular-after" loading />);
    expect(button).toMatchSnapshot();
  });

  it("should allow for custom children to be displayed only while loading", () => {
    const props: AsyncButtonProps = {
      beforeAddon: <FontIcon>favorite</FontIcon>,
      afterAddon: <FontIcon>remove</FontIcon>,
      loadingChildren: "Loading...",
      children: "Button",
    };
    const { rerender } = rmdRender(<AsyncButton {...props} />);

    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByText("Button")).not.toThrowError();
    expect(() => screen.getByText("Loading...")).toThrowError();
    expect(button).toMatchSnapshot();

    rerender(<AsyncButton loading {...props} />);
    expect(() => screen.getByText("Button")).toThrowError();
    expect(() => screen.getByText("Loading...")).not.toThrowError();
    expect(button).toMatchSnapshot();
  });

  it("should use the current-color as the progress bar's color when not using the clear or disabled theme which should use the primary theme instead", () => {
    const props: AsyncButtonProps = {
      loading: true,
      children: "Button",
    };
    const { rerender } = rmdRender(<AsyncButton {...props} theme="clear" />);
    const progress = screen.getByRole("progressbar");
    expect(progress).toHaveClass("rmd-primary-color");

    rerender(<AsyncButton {...props} theme="disabled" />);
    expect(progress).toHaveClass("rmd-primary-color");

    rerender(<AsyncButton {...props} floating="bottom-left" />);
    expect(progress).toHaveClass("rmd-primary-color");
    expect(screen.getByRole("button", { name: "Button" })).toMatchSnapshot();
  });

  it("should default to using the same theme while loading but can use the disabled theme by enabling the loadingDisabledTheme prop", () => {
    const { rerender } = rmdRender(
      <AsyncButton loadingDisabledTheme>Button</AsyncButton>
    );
    const button = screen.getByRole("button", { name: "Button" });
    expect(button).toMatchSnapshot();

    rerender(
      <AsyncButton loading loadingDisabledTheme>
        Button
      </AsyncButton>
    );
    expect(button).toMatchSnapshot();
  });
});
