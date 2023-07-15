import { render } from "../../test-utils";

import { FontIcon } from "../../icon";
import type { TabProps } from "../Tab";
import { Tab } from "../Tab";

describe("Tab", () => {
  it("should support rendering an icon in different positions around the children", () => {
    const props: TabProps = {
      active: false,
      icon: <FontIcon>favorite</FontIcon>,
      children: "Tab",
    };

    const { getByRole, rerender } = render(<Tab {...props} />);
    const tab = getByRole("tab", { name: "Tab" });
    expect(tab).toMatchSnapshot();

    rerender(<Tab {...props} stacked />);
    expect(tab).toMatchSnapshot();

    rerender(<Tab {...props} iconAfter />);
    expect(tab).toMatchSnapshot();

    rerender(<Tab {...props} iconAfter stacked />);
    expect(tab).toMatchSnapshot();
  });
});
