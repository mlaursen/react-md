import React from "react";
import { render } from "@testing-library/react";

import { CardHeader } from "../CardHeader";

describe("CardHeader", () => {
  it("should render correctly", () => {
    const props = { children: <div>Content</div> };
    const { container, rerender } = render(<CardHeader {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<CardHeader {...props} align="top" />);
    expect(container).toMatchSnapshot();

    rerender(<CardHeader {...props} align="center" />);
    expect(container).toMatchSnapshot();

    rerender(<CardHeader {...props} align="bottom" />);
    expect(container).toMatchSnapshot();

    rerender(<CardHeader {...props} align="none" />);
    expect(container).toMatchSnapshot();

    rerender(
      <CardHeader
        {...props}
        className="custom-class-name"
        contentClassName="content-class-name"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should dynamically render content before and after the children", () => {
    const props = { children: <div>Content</div> };
    const beforeChildren = <div>Before</div>;
    const afterChildren = <div>After</div>;
    const { container, rerender } = render(
      <CardHeader {...props} beforeChildren={beforeChildren} />
    );

    expect(container).toMatchSnapshot();

    rerender(<CardHeader {...props} afterChildren={afterChildren} />);
    expect(container).toMatchSnapshot();

    rerender(
      <CardHeader
        {...props}
        beforeChildren={beforeChildren}
        afterChildren={afterChildren}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
