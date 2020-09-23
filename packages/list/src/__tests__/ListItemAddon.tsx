import React from "react";
import { render } from "@testing-library/react";

import { ListItemAddon, ListItemAddonProps } from "../ListItemAddon";

describe("ListItemAddon", () => {
  it("should only render the children if the addon prop is null or false", () => {
    const { container, rerender } = render(
      <ListItemAddon addon={null}>Children</ListItemAddon>
    );

    expect(container).toMatchSnapshot();

    rerender(<ListItemAddon addon={false}>Children</ListItemAddon>);
    expect(container).toMatchSnapshot();

    rerender(
      <ListItemAddon addon={null}>
        <span className="content">Content</span>
      </ListItemAddon>
    );
    expect(container).toMatchSnapshot();
  });

  // these tests are lazy and bad
  it("should render the different addon types and positions correctly for icons", () => {
    const props: ListItemAddonProps = {
      children: "Content",
      addon: <span data-testid="addon">Addon</span>,
      type: "icon",
    };

    const { getByTestId, rerender } = render(
      <ListItemAddon {...props} position="middle" />
    );
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="middle" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="top" />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="top" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="bottom" />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="bottom" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();
  });

  it("should render the different addon types and positions correctly for avatars", () => {
    const props: ListItemAddonProps = {
      children: "Content",
      addon: <span data-testid="addon">Addon</span>,
      type: "avatar",
    };

    const { getByTestId, rerender } = render(
      <ListItemAddon {...props} position="middle" />
    );
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="middle" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="top" />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="top" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="bottom" />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="bottom" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();
  });

  it("should render the different addon types and positions correctly for media", () => {
    const props: ListItemAddonProps = {
      children: "Content",
      addon: <span data-testid="addon">Addon</span>,
      type: "media",
    };

    const { getByTestId, rerender } = render(
      <ListItemAddon {...props} position="middle" />
    );
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="middle" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="top" />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="top" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="bottom" />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="bottom" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();
  });

  it("should render the different addon types and positions correctly for large media", () => {
    const props: ListItemAddonProps = {
      children: "Content",
      addon: <span data-testid="addon">Addon</span>,
      type: "large-media",
    };

    const { getByTestId, rerender } = render(
      <ListItemAddon {...props} position="middle" />
    );
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="middle" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="top" />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="top" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="bottom" />);
    expect(getByTestId("addon")).toMatchSnapshot();

    rerender(<ListItemAddon {...props} position="bottom" addonAfter />);
    expect(getByTestId("addon")).toMatchSnapshot();
  });

  it("should default to rendering the addon as an icon and in the middle", () => {
    const props = {
      children: "Content",
      addon: <span data-testid="addon">Addon</span>,
    };

    const { container, rerender } = render(<ListItemAddon {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<ListItemAddon {...props} type="icon" position="middle" />);
    expect(container).toMatchSnapshot();
  });

  it("should not clone the classnames into the addon if the forceIconWrap prop is enabled", () => {
    const props = {
      children: "Content",
      addon: <span data-testid="addon">Addon</span>,
      forceAddonWrap: true,
    };

    const { getByTestId, container } = render(<ListItemAddon {...props} />);

    expect(getByTestId("addon").className).toBe("");
    expect(container).toMatchSnapshot();
  });
});
