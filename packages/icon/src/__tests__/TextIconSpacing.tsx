import React from "react";
import { render } from "@testing-library/react";

import { TextIconSpacing } from "../TextIconSpacing";

describe("TextIconSpacing", () => {
  it("should be able to render without any children or icon even though it's worthless", () => {
    const { container } = render(<TextIconSpacing />);
    expect(container.firstChild).toBe(null);
  });

  it("should return the children if no icon prop is provided", () => {
    const { container } = render(
      <TextIconSpacing>
        <span />
      </TextIconSpacing>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render the icon before the children by default", () => {
    const { container, getByTestId } = render(
      <TextIconSpacing icon={<i data-testid="icon" />}>
        <span data-testid="span" />
      </TextIconSpacing>
    );

    const icon = getByTestId("icon");
    const span = getByTestId("span");
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toBe(icon);
    expect(container.lastChild).toBe(span);
  });

  it("should render the icon after the children if the iconAfter prop is enabled", () => {
    const { container, getByTestId } = render(
      <TextIconSpacing icon={<i data-testid="icon" />} iconAfter>
        <span data-testid="span" />
      </TextIconSpacing>
    );

    const icon = getByTestId("icon");
    const span = getByTestId("span");
    expect(container).toMatchSnapshot();
    expect(container.firstChild).toBe(span);
    expect(container.lastChild).toBe(icon);
  });

  it("should clone the default class names into the icon element", () => {
    const { rerender, getByTestId } = render(
      <TextIconSpacing icon={<i data-testid="icon" />}>
        <span />
      </TextIconSpacing>
    );

    let icon = getByTestId("icon");
    expect(icon.className).toBe("rmd-icon--before");

    rerender(
      <TextIconSpacing icon={<i data-testid="icon" />} iconAfter>
        <span />
      </TextIconSpacing>
    );
    icon = getByTestId("icon");
    expect(icon.className).toBe("rmd-icon--after");
  });

  it("should wrap the icon in a span with the required classNames if the icon is not a valid react element or the forceIconWrap prop is enabled", () => {
    const { container, rerender } = render(
      <TextIconSpacing icon="Some text">
        <div />
      </TextIconSpacing>
    );

    expect(container).toMatchSnapshot();

    rerender(
      <TextIconSpacing icon={<i />} forceIconWrap>
        <div />
      </TextIconSpacing>
    );
    expect(container).toMatchSnapshot();
  });

  it("should swap the classnames correctly when flexReverse is enabled", () => {
    const props = {
      icon: <i data-testid="icon" />,
      children: <span>children</span>,
      flexReverse: true,
    };
    const { container, getByTestId, rerender } = render(
      <TextIconSpacing {...props} />
    );
    expect(container).toMatchSnapshot();

    expect(getByTestId("icon").className).toContain("rmd-icon--after");

    rerender(<TextIconSpacing {...props} iconAfter />);
    expect(container).toMatchSnapshot();
    expect(getByTestId("icon").className).toContain("rmd-icon--before");

    rerender(<TextIconSpacing {...props} stacked />);
    expect(container).toMatchSnapshot();
    expect(getByTestId("icon").className).toContain("rmd-icon--below");

    rerender(<TextIconSpacing {...props} stacked iconAfter />);
    expect(container).toMatchSnapshot();
    expect(getByTestId("icon").className).toContain("rmd-icon--above");
  });
});
