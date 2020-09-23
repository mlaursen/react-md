import React from "react";
import { render } from "@testing-library/react";

import { Badge, BadgeTheme } from "../Badge";

describe("Badge", () => {
  it("should render as null by default", () => {
    const { container } = render(<Badge id="badge" />);

    expect(container).toMatchSnapshot();
    expect(document.getElementById("badge")).toBe(null);
  });

  it('should render as null when the children is 0, "0", or null', () => {
    const { container, rerender } = render(<Badge id="badge">0</Badge>);

    expect(container).toMatchSnapshot();
    expect(document.getElementById("badge")).toBe(null);

    rerender(
      <Badge id="badge" disableNullOnZero>
        0
      </Badge>
    );
    expect(container).toMatchSnapshot();
    expect(document.getElementById("badge")).not.toBe(null);
  });

  it("should correctly merge className and themes", () => {
    const themes: BadgeTheme[] = ["primary", "secondary", "default"];

    themes.forEach((theme) => {
      const { container, getByTestId, rerender, unmount } = render(
        <Badge id="badge" data-testid="badge" theme={theme}>
          3
        </Badge>
      );

      expect(container).toMatchSnapshot();
      expect(getByTestId("badge").className).toBe(
        `rmd-badge rmd-badge--${theme}`
      );

      rerender(
        <Badge
          id="badge"
          data-testid="badge"
          theme={theme}
          className="custom-class-name"
        >
          3
        </Badge>
      );
      expect(container).toMatchSnapshot();
      expect(getByTestId("badge").className).toBe(
        `rmd-badge rmd-badge--${theme} custom-class-name`
      );

      unmount();
    });

    const { container, getByTestId, rerender, unmount } = render(
      <Badge id="badge" data-testid="badge" theme="clear">
        3
      </Badge>
    );

    expect(container).toMatchSnapshot();
    expect(getByTestId("badge").className).toBe("rmd-badge");

    rerender(
      <Badge
        id="badge"
        data-testid="badge"
        theme="clear"
        className="custom-class-name"
      >
        3
      </Badge>
    );
    expect(container).toMatchSnapshot();
    expect(getByTestId("badge").className).toBe("rmd-badge custom-class-name");

    unmount();
  });
});
