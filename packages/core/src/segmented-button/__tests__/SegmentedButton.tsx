import { describe, expect, it } from "@jest/globals";
import { createRef } from "react";
import { FontIcon } from "../../icon/FontIcon.js";
import { rmdRender, screen } from "../../test-utils/index.js";
import { SegmentedButton } from "../SegmentedButton.js";
import { segmentedButton } from "../segmentedButtonStyles.js";

describe("SegmentedButton", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLButtonElement>();
    const props = {
      ref,
      children: "Button",
    } as const;

    const { rerender } = rmdRender(<SegmentedButton {...props} />);

    const element = screen.getByRole("button", { name: "Button" });
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <SegmentedButton
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();

    rerender(<SegmentedButton {...props} selected />);
    expect(element).toMatchSnapshot();

    rerender(<SegmentedButton {...props} disableSelectedIcon />);
    expect(element).toMatchSnapshot();

    rerender(<SegmentedButton {...props} disableSelectedTransition />);
    expect(element).toMatchSnapshot();
  });

  it("should support rendering left and right addons so the children can be text and elevated", () => {
    rmdRender(
      <SegmentedButton
        leftAddon={<FontIcon>home</FontIcon>}
        rightAddon={<FontIcon>check</FontIcon>}
      >
        Content
      </SegmentedButton>
    );

    const button = screen.getByRole("button", { name: "Content" });
    expect(button).toMatchSnapshot();
  });

  describe("styling utility class", () => {
    it("should be callable without any arguments", () => {
      expect(segmentedButton()).toMatchSnapshot();
    });
  });
});
