import React from "react";
import { render, waitFor } from "@testing-library/react";

import { Sheet } from "../Sheet";

const PROPS = {
  id: "sheet",
  "aria-label": "Label",
  children: <button type="button">Close</button>,
  visible: true,
  onRequestClose: () => {},
};

describe("Sheet", () => {
  it("should portal by default", () => {
    const { baseElement, container, rerender } = render(<Sheet {...PROPS} />);

    expect(container.firstElementChild).toBeNull();
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...PROPS} portal={false} />);
    expect(container.firstElementChild).not.toBeNull();
    expect(baseElement).toMatchSnapshot();
  });

  it("should render correctly based on the position", () => {
    const { baseElement, rerender } = render(<Sheet {...PROPS} />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...PROPS} position="right" />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...PROPS} position="bottom" />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...PROPS} position="left" />);
    expect(baseElement).toMatchSnapshot();

    rerender(<Sheet {...PROPS} position="top" />);
    expect(baseElement).toMatchSnapshot();
  });

  it("should correctly enable the hidden prop if the mountOnEnter and unmountOnExit props are disabled", async () => {
    const onExited = jest.fn();
    const props = {
      ...PROPS,
      onExited,
      mountOnEnter: false,
      unmountOnExit: false,
    };

    const { getByRole, rerender } = render(
      <Sheet {...props} visible={false} />
    );

    let dialog = getByRole("dialog", { hidden: true });
    expect(dialog).toHaveAttribute("hidden", "");
    expect(onExited).not.toBeCalled();

    rerender(<Sheet {...props} />);
    dialog = getByRole("dialog", { hidden: true });
    expect(dialog).not.toHaveAttribute("hidden");
    expect(onExited).not.toBeCalled();

    rerender(<Sheet {...props} visible={false} />);
    expect(onExited).not.toBeCalled();

    await waitFor(() => {
      // there has to be a better way to handle this
      if (onExited.mock.calls.length === 0) {
        throw new Error();
      }
    });
    expect(onExited).toBeCalledTimes(1);
  });
});
