import React from "react";
import { render } from "@testing-library/react";

import ListItemIcon, { ListItemIconProps } from "../ListItemIcon";

describe("ListItemIcon", () => {
  it("should render correctly based on the addon type", () => {
    const props: ListItemIconProps = {
      children: "Content",
      position: "middle",
      before: false,
      avatar: false,
      media: false,
      mediaLarge: false,
    };

    const { container, rerender } = render(<ListItemIcon {...props} />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} before />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} avatar />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} avatar before />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} media />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} media before />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} mediaLarge />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} mediaLarge before />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} position="top" />);
    expect(container).toMatchSnapshot();

    rerender(<ListItemIcon {...props} position="bottom" />);
    expect(container).toMatchSnapshot();
  });
});
