import { render } from "@testing-library/react";

import { MenuItemGroup } from "../MenuItemGroup";

describe("MenuItemGroup", () => {
  it("should require an aria-label or aria-labelledby for a11y", () => {
    const props = { children: <li>Content</li> };

    // @ts-expect-error
    const { container, rerender } = render(<MenuItemGroup {...props} />);
    expect(container).toMatchSnapshot();

    rerender(<MenuItemGroup aria-label="Group" {...props} />);
    expect(container).toMatchSnapshot();

    rerender(<MenuItemGroup aria-labelledby="non-existing-id" {...props} />);
    expect(container).toMatchSnapshot();
  });
});
