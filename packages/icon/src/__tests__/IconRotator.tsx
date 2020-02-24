import React, { FC } from "react";
import { cnb } from "cnbuilder";
import { render } from "@testing-library/react";

import IconRotator from "../IconRotator";
import FontIcon from "../FontIcon";
import SVGIcon from "../SVGIcon";

const Icon: FC<{ className?: string }> = ({ className }) => (
  <i data-testid="icon" className={cnb("custom-icon", className)} />
);

describe("IconRotator", () => {
  it("should default to cloning the icon rotator class names into the child element", () => {
    const { container, getByTestId, rerender } = render(
      <IconRotator data-testid="rotator" rotated={false}>
        <Icon />
      </IconRotator>
    );
    const icon = getByTestId("icon");
    expect(icon.className).toBe(
      "custom-icon rmd-icon-rotator rmd-icon-rotator--animate"
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator data-testid="rotator" rotated>
        <Icon />
      </IconRotator>
    );
    expect(icon.className).toBe(
      "custom-icon rmd-icon-rotator rmd-icon-rotator--animate rmd-icon-rotator--rotated"
    );
    expect(container).toMatchSnapshot();
  });

  it("should work automatically with the FontIcon component", () => {
    const { container, rerender } = render(
      <IconRotator rotated={false}>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();
  });

  it("should work automatically with the SVGIcon component", () => {
    const { container, rerender } = render(
      <IconRotator rotated={false}>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();
  });

  it("should wrapp the children with a span if the forceIconWrap prop is enabled", () => {
    const { container, rerender } = render(
      <IconRotator rotated={false} forceIconWrap>
        <Icon />
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated forceIconWrap>
        <Icon />
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated={false} forceIconWrap>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated forceIconWrap>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated={false} forceIconWrap>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated forceIconWrap>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();
  });
});
