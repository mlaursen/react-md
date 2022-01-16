import { render } from "@testing-library/react";

import { VerticalDivider } from "../VerticalDivider";

describe("VerticalDivider", () => {
  it("should render as a div with the vertical divider class names", () => {
    const { container } = render(<VerticalDivider />);
    const divider = container.querySelector(".rmd-divider") as HTMLDivElement;

    expect(divider.tagName).toBe("DIV");
    expect(divider.className).toBe("rmd-divider rmd-divider--vertical");
    expect(container).toMatchSnapshot();
  });
});
