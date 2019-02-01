import * as React from "react";
import { create } from "react-test-renderer";
import { mount } from "enzyme";

import TextIconSpacing from "../TextIconSpacing";

describe("TextIconSpacing", () => {
  it("should be able to render without any children or icon even though it's worthless", () => {
    expect(create(<TextIconSpacing />).toJSON()).toMatchSnapshot();
  });

  it("should return the children if no icon prop is provided", () => {
    const instance = mount(
      <TextIconSpacing>
        <span />
      </TextIconSpacing>
    );
    expect(instance.render()).toMatchSnapshot();
    expect(instance.find("span").length).toBe(1);
    expect(instance.find("span").props().className).toBeUndefined();
  });

  it("should render the icon before the children by default", () => {
    const instance = mount(
      <TextIconSpacing icon={<i />}>
        <span />
      </TextIconSpacing>
    );

    expect(
      instance
        .children()
        .first()
        .type()
    ).toBe("i");
    expect(
      instance
        .children()
        .at(1)
        .type()
    ).toBe("span");
  });

  it("should render the icon after the children if the iconAfter prop is enabled", () => {
    const instance = mount(
      <TextIconSpacing icon={<i />} iconAfter>
        <span />
      </TextIconSpacing>
    );

    expect(
      instance
        .children()
        .first()
        .type()
    ).toBe("span");
    expect(
      instance
        .children()
        .at(1)
        .type()
    ).toBe("i");
  });

  it("should clone the default class names into the icon element", () => {
    const instance = mount(
      <TextIconSpacing icon={<i />}>
        <span />
      </TextIconSpacing>
    );

    expect(instance.find("i").hasClass("rmd-icon--before")).toBe(true);
    expect(instance.find("i").hasClass("rmd-icon--after")).toBe(false);

    instance.setProps({ iconAfter: true });
    expect(instance.find("i").hasClass("rmd-icon--before")).toBe(false);
    expect(instance.find("i").hasClass("rmd-icon--after")).toBe(true);
  });

  it("should wrap the icon in a span with the required classNames if the icon is not a valid react element or the forceIconWrap prop is enabled", () => {
    // have to wrap the tests in divs since enzyme doesn't know how to render React.Fragment or arrays atm
    const instance1 = mount(
      <div>
        <TextIconSpacing icon="Some text">
          <div />
        </TextIconSpacing>
      </div>
    );

    expect(instance1.render()).toMatchSnapshot();
    expect(instance1.find("span").hasClass("rmd-text-icon-spacing")).toBe(true);
    expect(instance1.find("span").hasClass("rmd-icon--before")).toBe(true);

    const instance2 = mount(
      <div>
        <TextIconSpacing icon={<i />} forceIconWrap>
          <div />
        </TextIconSpacing>
      </div>
    );

    expect(instance2.render()).toMatchSnapshot();
    expect(instance2.find("span").hasClass("rmd-text-icon-spacing")).toBe(true);
    expect(instance2.find("span").hasClass("rmd-icon--before")).toBe(true);
  });
});
