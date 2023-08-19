import { describe, expect, it } from "@jest/globals";
import type { ReactElement } from "react";
import {
  render,
  screen,
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "../../test-utils/index.js";

import { Button } from "../../button/Button.js";
import { Tooltip } from "../Tooltip.js";
import { TooltipHoverModeProvider } from "../TooltipHoverModeProvider.js";
import { useTooltip } from "../useTooltip.js";

function TooltippedButton({ index }: { index: number }): ReactElement {
  const { elementProps, tooltipProps } = useTooltip({
    // make it so Button 3 always requires 1s of hovering
    hoverTime: index === 2 ? 1000 : undefined,
    leaveTime: index === 2 ? 1000 : undefined,
  });

  return (
    <>
      <Button {...elementProps}>{`Button ${index + 1}`}</Button>
      <Tooltip {...tooltipProps} temporary>{`Tooltip ${index + 1}`}</Tooltip>
    </>
  );
}

function Test(): ReactElement {
  return (
    <TooltipHoverModeProvider>
      <TooltippedButton index={0} />
      <TooltippedButton index={1} />
      <TooltippedButton index={2} />
      <TooltippedButton index={3} />
    </TooltipHoverModeProvider>
  );
}

describe("TooltipHoverModeProvider", () => {
  it("should support hover mode behavior", async () => {
    const user = userEvent.setup();
    render(<Test />);

    const button1 = screen.getByRole("button", { name: "Button 1" });
    const button2 = screen.getByRole("button", { name: "Button 2" });
    const button3 = screen.getByRole("button", { name: "Button 3" });
    const button4 = screen.getByRole("button", { name: "Button 4" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.hover(button1);
    expect(() => screen.getByRole("tooltip", { name: "Tooltip 1" })).toThrow();

    const tooltip1 = await screen.findByRole("tooltip", { name: "Tooltip 1" });
    expect(tooltip1).toHaveClass("rmd-tooltip--enter");
    await waitFor(() => {
      expect(tooltip1).not.toHaveClass("rmd-tooltip--enter");
    });

    await user.hover(button2);
    await waitFor(() => {
      expect(
        screen.getByRole("tooltip", { name: "Tooltip 2" })
      ).toBeInTheDocument();
    });
    const tooltip2 = screen.getByRole("tooltip", { name: "Tooltip 2" });

    await waitForElementToBeRemoved(tooltip1);
    await user.hover(button3);
    expect(() => screen.getByRole("tooltip", { name: "Tooltip 3" })).toThrow();

    const tooltip3 = await screen.findByRole("tooltip", { name: "Tooltip 3" });
    expect(tooltip3).toBeInTheDocument();
    expect(tooltip2).not.toBeInTheDocument();

    await user.hover(button4);
    expect(tooltip3).toBeInTheDocument();

    // since Tooltip 3 is still in the same hover mode provider, hovering it
    // does not disable hover mode
    const tooltip4 = screen.getByRole("tooltip", { name: "Tooltip 4" });
    await waitForElementToBeRemoved(tooltip3, { timeout: 2000 });

    await user.unhover(button4);
    await waitForElementToBeRemoved(tooltip4);
  });
});
