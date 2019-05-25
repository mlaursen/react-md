import * as React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";

import SVGIcon from "../SVGIcon";

const homePath = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;

describe("SVGIcon", () => {
  it("should default to setting aria-hidden to not spam screen readers", () => {
    const icon = mount(<SVGIcon />);

    expect(icon.find("svg").props()["aria-hidden"]).toBe("true");
  });

  it("should default to setting focusable false for IE bugs of custom focus", () => {
    const icon = mount(<SVGIcon />);

    expect(icon.find("svg").props().focusable).toBe("false");
  });

  it("should use render correctly with a <path> child", () => {
    expect(
      create(
        <SVGIcon>
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
        </SVGIcon>
      ).toJSON()
    ).toMatchSnapshot();
  });

  it("should render correctly when the use title, desc, use, and aria-labelledby props are provided", () => {
    const icon = mount(
      <SVGIcon use="/sprites#custom-icon" title="Custom Icon" />
    );

    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ desc: "This is a custom icon description" });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({ use: undefined });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({
      title: undefined,
      desc: undefined,
      "aria-labelledby": "custom-icon-title",
    });
    expect(icon.render()).toMatchSnapshot();

    icon.setProps({
      "aria-labelledby": "custom-icon-title custom-item-desc",
    });
    expect(icon.render()).toMatchSnapshot();
  });

  it("should render correctly with the dense prop", () => {
    expect(
      create(<SVGIcon dense>{homePath}</SVGIcon>).toJSON()
    ).toMatchSnapshot();
  });
});
