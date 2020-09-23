import React from "react";
import { render } from "@testing-library/react";

import { CardContent } from "../CardContent";

describe("CardContent", () => {
  it("should render correctly", () => {
    const props = { children: <div>Content</div> };

    const { container, rerender } = render(<CardContent {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<CardContent {...props} disablePadding />);
    expect(container).toMatchSnapshot();

    rerender(<CardContent {...props} disableExtraPadding />);
    expect(container).toMatchSnapshot();

    rerender(<CardContent {...props} disableParagraphMargin />);
    expect(container).toMatchSnapshot();

    rerender(<CardContent {...props} disableSecondaryColor />);
    expect(container).toMatchSnapshot();

    rerender(
      <CardContent
        {...props}
        className="custom-class-name"
        disablePadding
        disableExtraPadding
        disableParagraphMargin
        disableSecondaryColor
      />
    );
    expect(container).toMatchSnapshot();
  });
});
