import { render, fireEvent } from "@testing-library/react";

import { Overlay } from "../Overlay";

describe("Overlay", () => {
  it("should render correctly", () => {
    const props = { "data-testid": "overlay", onRequestClose: () => {} };
    const { container, getByTestId, rerender } = render(
      <Overlay {...props} visible={false} />
    );

    const getOverlay = (): HTMLElement => getByTestId("overlay");

    expect(getOverlay).toThrow();
    expect(container).toMatchSnapshot();

    rerender(<Overlay {...props} visible />);
    expect(getOverlay()).toHaveClass("rmd-overlay");
    expect(getOverlay()).toHaveClass("rmd-overlay--visible");
    expect(getOverlay()).toHaveClass("rmd-overlay--clickable");
    expect(getOverlay()).toHaveClass("rmd-overlay--active");
    expect(container).toMatchSnapshot();

    rerender(<Overlay {...props} visible hidden />);
    expect(getOverlay()).toHaveClass("rmd-overlay");
    expect(getOverlay()).toHaveClass("rmd-overlay--visible");
    expect(getOverlay()).toHaveClass("rmd-overlay--clickable");
    expect(getOverlay()).not.toHaveClass("rmd-overlay--active");
    expect(container).toMatchSnapshot();

    rerender(<Overlay {...props} visible clickable={false} />);
    expect(getOverlay()).toHaveClass("rmd-overlay");
    expect(getOverlay()).toHaveClass("rmd-overlay--visible");
    expect(getOverlay()).not.toHaveClass("rmd-overlay--clickable");
    expect(getOverlay()).toHaveClass("rmd-overlay--active");
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

  it("should not call onRequestClose if the onClick handler calls event.stopPropagation()", () => {
    const onRequestClose = jest.fn();
    const { getByTestId } = render(
      <Overlay
        data-testid="overlay"
        visible
        onRequestClose={onRequestClose}
        onClick={(event) => event.stopPropagation()}
      />
    );

    const overlay = getByTestId("overlay");
    fireEvent.click(overlay);
    expect(onRequestClose).not.toBeCalled();
  });
});
