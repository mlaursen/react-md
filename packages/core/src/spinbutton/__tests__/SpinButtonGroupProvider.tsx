import { type ReactElement, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { Box } from "../../box/Box.js";
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import { SpinButton } from "../SpinButton.js";
import { SpinButtonGroupProvider } from "../SpinButtonGroupProvider.js";
import {
  type SpinButtonGroupProviderOptions,
  useSpinButtonGroupProvider,
} from "../useSpinButtonGroupProvider.js";

interface TestProps {
  options?: SpinButtonGroupProviderOptions;
}

function Test({ options }: TestProps): ReactElement {
  const { movementProps, movementContext } =
    useSpinButtonGroupProvider(options);

  return (
    <Box {...movementProps}>
      <SpinButtonGroupProvider value={movementContext}>
        <SpinButton aria-label="Hours" min={1} max={12} fallback="HH" />
        <SpinButton aria-label="Minutes" min={0} max={60} fallback="MM" />
      </SpinButtonGroupProvider>
    </Box>
  );
}

const setup = (options?: SpinButtonGroupProviderOptions) => {
  const user = userEvent.setup();
  render(<Test options={options} />);

  return {
    user,
    group: screen.getByRole("group"),
    hours: screen.getByRole("spinbutton", { name: "Hours" }),
    minutes: screen.getByRole("spinbutton", { name: "Minutes" }),
  };
};

describe("SpinButtonGroupProvider", () => {
  it("should be able to connect a group of SpinButtons together and focus the next when typed-to-completion", async () => {
    const { user, hours, minutes } = setup();

    await user.tab();

    // this doesn't work without the manual focus for some reason. the
    // selection is fired, but not persisted
    fireEvent.focus(hours);
    expect(hours).toHaveFocus();
    expect(hours).toHaveSelection("HH");

    await user.keyboard("3");
    expect(hours).toHaveValue(3);
    expect(minutes).toHaveFocus();
    fireEvent.focus(minutes);
    expect(minutes).toHaveSelection("MM");

    await user.keyboard("00");
    expect(minutes).toHaveValue(0);
    expect(minutes).toHaveFocus();
  });

  it("should allow for the event listeners to be hooked into", async () => {
    const ref = createRef<HTMLDivElement>();
    const onClick = vi.fn();
    const onFocus = vi.fn();
    const onKeyDown = vi.fn();
    const { user, group, hours } = setup({
      ref,
      onClick,
      onFocus,
      onKeyDown,
    });

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(group);
    expect(group).toMatchSnapshot();
    expect(group).not.toHaveAttribute("tabIndex");
    expect(group).not.toHaveAttribute("aria-activedescendant");

    await user.type(hours, "1");

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });
});
