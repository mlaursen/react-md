import React, { useState } from "react";
import { fireEvent, render } from "@testing-library/react";

import { Switch } from "../Switch";

describe("Switch", () => {
  it("should render correctly with and without a label", () => {
    const props = { id: "switch" };
    const { container, rerender } = render(<Switch {...props} />);

    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} label="Label" />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} label="Label" iconAfter />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} label="Label" inline />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} label="Label" stacked />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} label="Label" inline stacked />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} label="Label" inline iconAfter />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} label="Label" stacked iconAfter />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} label="Label" inline stacked iconAfter />);
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with the different state props", () => {
    const props = { id: "switch", label: <span>Label</span> };
    const { container, rerender } = render(<Switch {...props} disabled />);

    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} labelDisabled />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} disabled labelDisabled={false} />);
    expect(container).toMatchSnapshot();

    rerender(<Switch {...props} error />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to render the children within the switch's ball hiden label", () => {
    const { container } = render(
      <Switch id="switch" label="Label">
        <span>Content</span>
      </Switch>
    );

    expect(container).toMatchSnapshot();
  });

  it("should work as a controlled component", () => {
    function Test() {
      const [checked, setChecked] = useState(false);

      return (
        <Switch
          id="switch"
          label="Label"
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
      );
    }

    const { getByRole } = render(<Test />);

    const checkbox = getByRole("checkbox", { name: "Label" });
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
