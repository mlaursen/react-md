import * as React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";

import IconRotator from "../IconRotator";
import FontIcon from "../FontIcon";
import SVGIcon from "../SVGIcon";

const Icon = ({ className }: any) => (
  <i className={`${className} custom-icon`} />
);

describe("IconRotator", () => {
  it("should default to cloning the icon rotator classNames into the child element", () => {
    const icon = mount(
      <IconRotator rotated={false}>
        <Icon />
      </IconRotator>
    );

    expect(icon.find("i").hasClass("custom-icon")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon-rotator")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon-rotator--animate")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon-rotator--rotated")).toBe(false);
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ rotated: true });
    expect(icon.find("i").hasClass("custom-icon")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon-rotator")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon-rotator--animate")).toBe(true);
    expect(icon.find("i").hasClass("rmd-icon-rotator--rotated")).toBe(true);
    expect(icon.render()).toMatchSnapshot();
  });

  it("should be able to work out of the box with SVGIcon and FontIcon", () => {
    const fontRotator = mount(
      <IconRotator rotated={false}>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    const svgRotator = mount(
      <IconRotator rotated={false}>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );

    expect(fontRotator.render()).toMatchSnapshot();
    expect(svgRotator.render()).toMatchSnapshot();

    fontRotator.setProps({ rotated: true });
    svgRotator.setProps({ rotated: true });
    expect(fontRotator.render()).toMatchSnapshot();
    expect(svgRotator.render()).toMatchSnapshot();
  });

  it("should wrap the children with a span instead of cloning in the className when the forceIconWrap prop is enabled", () => {
    expect(
      create(
        <IconRotator rotated={false} forceIconWrap>
          <Icon />
        </IconRotator>
      ).toJSON()
    ).toMatchSnapshot();
    expect(
      create(
        <IconRotator rotated={false} forceIconWrap>
          <FontIcon>home</FontIcon>
        </IconRotator>
      ).toJSON()
    ).toMatchSnapshot();
    expect(
      create(
        <IconRotator rotated={false} forceIconWrap>
          <SVGIcon>
            <path d="0i3odksf" />
          </SVGIcon>
        </IconRotator>
      ).toJSON()
    ).toMatchSnapshot();
  });
});
