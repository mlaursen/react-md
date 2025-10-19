import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { FontIcon } from "../../icon/FontIcon.js";
import { render, screen, userEvent } from "../../test-utils/index.js";
import {
  TooltippedButton,
  type TooltippedButtonProps,
} from "../TooltippedButton.js";

describe("TooltippedButton", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Content",
    } as const;
    const { rerender } = render(<TooltippedButton {...props} />);

    const button = screen.getByRole("button", { name: "Content" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(button);
    expect(button).toMatchSnapshot();

    rerender(
      <TooltippedButton
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(button).toMatchSnapshot();
  });

  it("should only display a tooltip when the tooltip prop is truthy", async () => {
    const user = userEvent.setup();
    const props: TooltippedButtonProps = {
      "aria-label": "Favorite",
      tooltipOptions: {
        hoverTimeout: 0,
      },
      children: <FontIcon>favorite</FontIcon>,
    };
    const { rerender } = render(<TooltippedButton {...props} />);

    const button = screen.getByRole("button", { name: "Favorite" });
    await user.hover(button);

    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.unhover(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    rerender(<TooltippedButton {...props} tooltip="Tooltip" />);
    await user.hover(button);
    const tooltip = await screen.findByRole("tooltip", { name: "Tooltip" });

    await user.unhover(button);
    expect(tooltip).not.toBeInTheDocument();
  });
});
