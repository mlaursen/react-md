import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Dir, useDir } from "../Dir";

const Child = () => {
  const { dir, toggleDir } = useDir();
  return (
    <button type="button" onClick={toggleDir}>
      {dir}
    </button>
  );
};

describe("Dir", () => {
  it("should default to the root html dir prop if exists or fallback to ltr", () => {
    document.documentElement.setAttribute("dir", "rtl");

    let { unmount } = render(
      <Dir>
        <span />
      </Dir>
    );
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");

    ({ unmount } = render(
      <Dir>
        <span />
      </Dir>
    ));
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");
  });

  it("should update the root html with the defaultDir", () => {
    expect(document.documentElement).not.toHaveAttribute("dir");

    const { unmount } = render(
      <Dir defaultDir="ltr">
        <span />
      </Dir>
    );

    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");
  });

  it("should clone the dir into a child element", () => {
    const { getByTestId } = render(
      <Dir defaultDir="ltr">
        <Dir defaultDir="rtl">
          <span data-testid="span" />
        </Dir>
      </Dir>
    );

    const span = getByTestId("span");
    expect(span).toHaveAttribute("dir", "rtl");
  });

  it("should allow a child component to access and toggle the direction", () => {
    const { getByRole } = render(
      <Dir>
        <Child />
      </Dir>
    );

    const button = getByRole("button");
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    expect(button).toHaveTextContent("ltr");
    fireEvent.click(button);
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    expect(button).toHaveTextContent("rtl");
  });

  it("should toggle the correct parent with multiple Dir components", () => {
    const { getByRole } = render(
      <Dir>
        <Dir defaultDir="rtl">
          <Child />
        </Dir>
      </Dir>
    );

    const button = getByRole("button");
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    expect(button).toHaveTextContent("rtl");
    fireEvent.click(button);

    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    expect(button).toHaveTextContent("ltr");
  });

  it("should throw an error if the toggleDir function is called without initializing a Dir component", () => {
    let toggleDir: (() => void) | undefined;
    const Test = () => {
      ({ toggleDir } = useDir());
      return null;
    };

    render(<Test />);

    if (typeof toggleDir === "undefined") {
      throw new Error();
    }

    expect(toggleDir).toThrowError(
      "Tried to toggle the current writing direction without initializing the `Dir` component."
    );
  });
});
