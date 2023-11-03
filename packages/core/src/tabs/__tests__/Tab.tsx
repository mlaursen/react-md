import { describe, expect, it } from "@jest/globals";
import { render, screen } from "../../test-utils/index.js";

import { FontIcon } from "../../icon/FontIcon.js";
import { Tab, type TabProps } from "../Tab.js";

describe("Tab", () => {
  it("should support rendering an icon in different positions around the children", () => {
    const props: TabProps = {
      active: false,
      icon: <FontIcon>favorite</FontIcon>,
      children: "Tab",
    };

    const { rerender } = render(<Tab {...props} />);
    const tab = screen.getByRole("tab", { name: "Tab" });
    expect(tab).toMatchSnapshot();

    rerender(<Tab {...props} stacked />);
    expect(tab).toMatchSnapshot();

    rerender(<Tab {...props} iconAfter />);
    expect(tab).toMatchSnapshot();

    rerender(<Tab {...props} iconAfter stacked />);
    expect(tab).toMatchSnapshot();
  });
});
