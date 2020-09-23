import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Overlay } from "../Overlay";

describe("Overlay", () => {
  it("should render correctly", () => {
    const props = { onRequestClose: () => {} };
    const { container, rerender } = render(
      <Overlay {...props} visible={false} />
    );

    expect(container).toMatchSnapshot();

    rerender(<Overlay {...props} visible />);
    expect(container).toMatchSnapshot();

    rerender(<Overlay {...props} visible hidden />);
    expect(container).toMatchSnapshot();

    rerender(<Overlay {...props} visible clickable={false} />);
    expect(container).toMatchSnapshot();
  });

  it("should be able to portal", () => {
    const props = { onRequestClose: () => {}, visible: true };
    const { baseElement, container } = render(<Overlay {...props} portal />);

    expect(container.firstElementChild).toBe(null);
    expect(baseElement).toMatchSnapshot();
  });

  it("should call the onRequestClose when the overlay is clicked", () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <Overlay data-testid="overlay" visible onRequestClose={onRequestClose} />
    );
    const overlay = getByTestId("overlay");

    expect(onRequestClose).not.toBeCalled();

    fireEvent.click(overlay);
    expect(onRequestClose).toBeCalledTimes(1);
  });
});
