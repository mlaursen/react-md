import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement } from "react";
import {
  act,
  rmdRender,
  screen,
  setupResizeObserverMock,
  userEvent,
} from "../../test-utils/index.js";

import { Button } from "../../button/Button.js";
import { Tooltip } from "../Tooltip.js";
import {
  useOverflowTooltip,
  type OverflowTooltipOptions,
} from "../useOverflowTooltip.js";

function Test(props: OverflowTooltipOptions): ReactElement {
  const { nodeRef, elementProps, tooltipProps } = useOverflowTooltip({
    ...props,
    // make it show immediately for testing
    hoverTime: 0,
  });
  return (
    <>
      <Button {...elementProps}>
        <span data-testid="resize-node" ref={nodeRef}>
          Button
        </span>
      </Button>
      <Tooltip {...tooltipProps} temporary>
        Tooltip
      </Tooltip>
    </>
  );
}

describe("useOverflowTooltip", () => {
  it("should only display a tooltip when the text is not overflown", async () => {
    const user = userEvent.setup();
    const observer = setupResizeObserverMock();
    rmdRender(<Test />);

    const resizeNode = screen.getByTestId("resize-node");
    const button = screen.getByRole("button", { name: "Button" });
    expect(() => screen.getByRole("tooltip")).toThrow();

    const rect = resizeNode.getBoundingClientRect();
    jest.spyOn(resizeNode, "scrollWidth", "get").mockReturnValue(300);
    const offsetWidth = jest
      .spyOn(resizeNode, "offsetWidth", "get")
      .mockReturnValue(300);
    const getBoundingClientRect = jest
      .spyOn(resizeNode, "getBoundingClientRect")
      .mockReturnValue({ ...rect, width: 300 });

    act(() => {
      observer.resizeElement(resizeNode);
    });

    await user.hover(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    await user.unhover(button);
    expect(() => screen.getByRole("tooltip")).toThrow();

    offsetWidth.mockReturnValue(150);
    getBoundingClientRect.mockReturnValue({ ...rect, width: 150 });

    act(() => {
      observer.resizeElement(resizeNode);
    });

    await user.hover(button);
    expect(() => screen.getByRole("tooltip")).not.toThrow();
  });
});
