import { describe, expect, it } from "@jest/globals";
import { createRef, type ReactElement } from "react";
import { Button } from "../../button/Button.js";
import { rmdRender, screen } from "test-utils";
import { useToggle } from "../../useToggle.js";
import { type BaseSheetProps, Sheet } from "../Sheet.js";

interface TestProps extends Partial<BaseSheetProps> {
  defaultVisible?: boolean;
}

function Test({ defaultVisible = true, ...props }: TestProps): ReactElement {
  const { toggled, toggle, disable } = useToggle(defaultVisible);
  return (
    <>
      <Button onClick={toggle}>Toggle</Button>
      <Sheet
        {...props}
        aria-label="Sheet"
        visible={toggled}
        onRequestClose={disable}
      >
        <Button onClick={disable}>Close</Button>
      </Sheet>
    </>
  );
}

describe("Sheet", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "aria-label": "Sheet",
      ref,
      visible: true,
      onRequestClose: () => {},
    } as const;

    const { rerender } = rmdRender(<Sheet {...props} />);

    const dialog = screen.getByRole("dialog", { name: "Sheet" });
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(dialog);
    expect(dialog).toMatchSnapshot();

    rerender(
      <Sheet
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(dialog).toMatchSnapshot();
  });

  it("should allow the sheet to be positioned to the top, right, bottom, and left of the viewport with different sizes", () => {
    const { rerender } = rmdRender(<Test />);
    const sheet = screen.getByRole("dialog", { name: "Sheet" });

    expect(sheet).toHaveClass("rmd-sheet--left");
    expect(sheet).toHaveClass("rmd-sheet--horizontal");
    expect(sheet).toHaveClass("rmd-sheet--media-width");
    expect(sheet).not.toHaveClass("rmd-sheet--touch-width");
    expect(sheet).not.toHaveClass("rmd-sheet--static-width");
    expect(sheet).not.toHaveClass("rmd-sheet--vertical");
    expect(sheet).not.toHaveClass("rmd-sheet--viewport-height");
    expect(sheet).not.toHaveClass("rmd-sheet--touchable-height");
    expect(sheet).not.toHaveClass("rmd-sheet--recommended-height");

    rerender(<Test position="left" />);
    expect(sheet).toHaveClass("rmd-sheet--left");
    expect(sheet).toHaveClass("rmd-sheet--horizontal");
    expect(sheet).toHaveClass("rmd-sheet--media-width");
    expect(sheet).not.toHaveClass("rmd-sheet--touch-width");
    expect(sheet).not.toHaveClass("rmd-sheet--static-width");
    expect(sheet).not.toHaveClass("rmd-sheet--vertical");
    expect(sheet).not.toHaveClass("rmd-sheet--viewport-height");
    expect(sheet).not.toHaveClass("rmd-sheet--touchable-height");
    expect(sheet).not.toHaveClass("rmd-sheet--recommended-height");

    rerender(<Test position="right" />);
    expect(sheet).toHaveClass("rmd-sheet--right");
    expect(sheet).toHaveClass("rmd-sheet--horizontal");
    expect(sheet).toHaveClass("rmd-sheet--media-width");
    expect(sheet).not.toHaveClass("rmd-sheet--touch-width");
    expect(sheet).not.toHaveClass("rmd-sheet--static-width");
    expect(sheet).not.toHaveClass("rmd-sheet--vertical");
    expect(sheet).not.toHaveClass("rmd-sheet--viewport-height");
    expect(sheet).not.toHaveClass("rmd-sheet--touchable-height");
    expect(sheet).not.toHaveClass("rmd-sheet--recommended-height");

    rerender(<Test position="top" />);
    expect(sheet).toHaveClass("rmd-sheet--top");
    expect(sheet).not.toHaveClass("rmd-sheet--horizontal");
    expect(sheet).not.toHaveClass("rmd-sheet--media-width");
    expect(sheet).not.toHaveClass("rmd-sheet--touch-width");
    expect(sheet).not.toHaveClass("rmd-sheet--static-width");
    expect(sheet).toHaveClass("rmd-sheet--vertical");
    expect(sheet).not.toHaveClass("rmd-sheet--viewport-height");
    expect(sheet).not.toHaveClass("rmd-sheet--touchable-height");
    expect(sheet).toHaveClass("rmd-sheet--recommended-height");

    rerender(<Test position="bottom" />);
    expect(sheet).toHaveClass("rmd-sheet--bottom");
    expect(sheet).not.toHaveClass("rmd-sheet--horizontal");
    expect(sheet).not.toHaveClass("rmd-sheet--media-width");
    expect(sheet).not.toHaveClass("rmd-sheet--touch-width");
    expect(sheet).not.toHaveClass("rmd-sheet--static-width");
    expect(sheet).toHaveClass("rmd-sheet--vertical");
    expect(sheet).not.toHaveClass("rmd-sheet--viewport-height");
    expect(sheet).not.toHaveClass("rmd-sheet--touchable-height");
    expect(sheet).toHaveClass("rmd-sheet--recommended-height");
  });

  it("should allow different horizontal sizes", () => {
    const { rerender } = rmdRender(<Test />);
    const sheet = screen.getByRole("dialog", { name: "Sheet" });

    expect(sheet).toHaveClass("rmd-sheet--left");
    expect(sheet).toHaveClass("rmd-sheet--horizontal");
    expect(sheet).toHaveClass("rmd-sheet--media-width");
    expect(sheet).not.toHaveClass("rmd-sheet--touch-width");
    expect(sheet).not.toHaveClass("rmd-sheet--static-width");

    rerender(<Test horizontalSize="touch" />);
    expect(sheet).toHaveClass("rmd-sheet--left");
    expect(sheet).toHaveClass("rmd-sheet--horizontal");
    expect(sheet).not.toHaveClass("rmd-sheet--media-width");
    expect(sheet).toHaveClass("rmd-sheet--touch-width");
    expect(sheet).not.toHaveClass("rmd-sheet--static-width");

    rerender(<Test horizontalSize="static" />);
    expect(sheet).toHaveClass("rmd-sheet--left");
    expect(sheet).toHaveClass("rmd-sheet--horizontal");
    expect(sheet).not.toHaveClass("rmd-sheet--media-width");
    expect(sheet).not.toHaveClass("rmd-sheet--touch-width");
    expect(sheet).toHaveClass("rmd-sheet--static-width");

    rerender(<Test horizontalSize="none" />);
    expect(sheet).toHaveClass("rmd-sheet--left");
    expect(sheet).toHaveClass("rmd-sheet--horizontal");
    expect(sheet).not.toHaveClass("rmd-sheet--media-width");
    expect(sheet).not.toHaveClass("rmd-sheet--touch-width");
    expect(sheet).not.toHaveClass("rmd-sheet--static-width");
  });

  it("should allow different vertical sizes", () => {
    const { rerender } = rmdRender(<Test position="top" />);
    const sheet = screen.getByRole("dialog", { name: "Sheet" });

    expect(sheet).toHaveClass("rmd-sheet--top");
    expect(sheet).toHaveClass("rmd-sheet--vertical");
    expect(sheet).not.toHaveClass("rmd-sheet--viewport-height");
    expect(sheet).not.toHaveClass("rmd-sheet--touchable-height");
    expect(sheet).toHaveClass("rmd-sheet--recommended-height");

    rerender(<Test position="top" verticalSize="touch" />);
    expect(sheet).toHaveClass("rmd-sheet--top");
    expect(sheet).toHaveClass("rmd-sheet--vertical");
    expect(sheet).not.toHaveClass("rmd-sheet--viewport-height");
    expect(sheet).toHaveClass("rmd-sheet--touchable-height");
    expect(sheet).not.toHaveClass("rmd-sheet--recommended-height");

    rerender(<Test position="top" verticalSize="none" />);
    expect(sheet).toHaveClass("rmd-sheet--top");
    expect(sheet).toHaveClass("rmd-sheet--vertical");
    expect(sheet).toHaveClass("rmd-sheet--viewport-height");
    expect(sheet).not.toHaveClass("rmd-sheet--touchable-height");
    expect(sheet).not.toHaveClass("rmd-sheet--recommended-height");
  });
});
