import React from "react";
import { render } from "@testing-library/react";

import { Tab } from "../Tab";

describe("Tab", () => {
  it("should render correctly", () => {
    const props = { id: "tab", active: false, children: "Tab" };
    const { container, rerender } = render(<Tab {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<Tab {...props} disabled />);
    expect(container).toMatchSnapshot();

    rerender(<Tab {...props} stacked />);
    expect(container).toMatchSnapshot();

    const icon = <i>icon</i>;
    rerender(<Tab {...props} icon={icon} />);
    expect(container).toMatchSnapshot();

    rerender(<Tab {...props} icon={icon} iconAfter />);
    expect(container).toMatchSnapshot();

    rerender(<Tab {...props} icon={icon} stacked />);
    expect(container).toMatchSnapshot();

    rerender(<Tab {...props} icon={icon} iconAfter stacked />);
    expect(container).toMatchSnapshot();
  });
});
