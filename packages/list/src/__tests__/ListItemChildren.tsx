import React from "react";
import { render } from "@testing-library/react";

import ListItemChildren from "../ListItemChildren";

describe("ListItemChildren", () => {
  it("should render correctly", () => {
    const props = { children: "Content" };
    const { container, rerender } = render(<ListItemChildren {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<ListItemChildren {...props} textChildren />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemChildren primaryText="Content" />);
    expect(container).toMatchSnapshot();

    rerender(
      <ListItemChildren primaryText="Primary" secondaryText="Secondary" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should be able to render content to the left of the children where only one of the left* props will be used", () => {
    const props = { primaryText: "Primary Text" };
    const leftIcon = <span data-testid="left-icon">Left Icon</span>;
    const leftAvatar = <span data-testid="left-avatar">Left Avatar</span>;
    const leftMedia = <span data-testid="left-media">Left Media</span>;
    const leftMediaLarge = (
      <span data-testid="left-media-large">Left Media Large</span>
    );

    const { container, rerender } = render(
      <ListItemChildren {...props} leftIcon={leftIcon} />
    );

    expect(container).toMatchSnapshot();

    rerender(<ListItemChildren {...props} leftAvatar={leftAvatar} />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemChildren {...props} leftMedia={leftMedia} />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemChildren {...props} leftMediaLarge={leftMediaLarge} />);
    expect(container).toMatchSnapshot();

    rerender(
      <ListItemChildren
        {...props}
        leftIcon={leftIcon}
        leftAvatar={leftAvatar}
        leftMedia={leftMedia}
        leftMediaLarge={leftMediaLarge}
      />
    );
    expect(container).toMatchSnapshot();

    rerender(
      <ListItemChildren
        {...props}
        leftAvatar={leftAvatar}
        leftMedia={leftMedia}
        leftMediaLarge={leftMediaLarge}
      />
    );
    expect(container).toMatchSnapshot();

    rerender(
      <ListItemChildren
        {...props}
        leftMedia={leftMedia}
        leftMediaLarge={leftMediaLarge}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
