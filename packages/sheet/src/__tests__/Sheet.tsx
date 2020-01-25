import React from "react";
import { render } from "@testing-library/react";

import Sheet from "../Sheet";

const props = {
  id: "sheet",
  "aria-label": "Label",
  children: <button type="button">Close</button>,
  visible: true,
  onRequestClose: () => {},
};

describe("Sheet", () => {
  it("should portal by default", () => {
    const { baseElement, container, rerender } = render(<Sheet {...props} />);

    expect(container.firstElementChild).toBeNull();
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...props} portal={false} />);
    expect(container.firstElementChild).not.toBeNull();
    expect(baseElement).toMatchSnapshot();
  });

  it("should render correctly based on the position", () => {
    const { baseElement, rerender } = render(<Sheet {...props} />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...props} position="right" />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...props} position="bottom" />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...props} position="left" />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...props} position="top" />);
    expect(baseElement).toMatchSnapshot();
  });
});
