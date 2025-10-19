import { describe, expect, it } from "vitest";

import { FontIcon } from "../../icon/FontIcon.js";
import { render, screen } from "../../test-utils/index.js";
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

  it("should render as a button", () => {
    const { rerender } = render(<Tab active={false}>Tab</Tab>);
    let tab = screen.getByRole("tab", { name: "Tab" });
    expect(tab).toBeInstanceOf(HTMLButtonElement);

    rerender(
      <Tab as="button" active={false}>
        Tab
      </Tab>
    );
    tab = screen.getByRole("tab", { name: "Tab" });
    expect(tab).toBeInstanceOf(HTMLButtonElement);
  });

  it("should be able to render as a link using the as prop", () => {
    render(
      <Tab as="a" href="#tab" active={false}>
        Tab
      </Tab>
    );
    const tab = screen.getByRole("tab", { name: "Tab" });
    expect(tab).toBeInstanceOf(HTMLAnchorElement);
  });
});
