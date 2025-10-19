import { type FC } from "react";
import { describe, expect, it } from "vitest";

import { fireEvent, render, screen } from "../../test-utils/index.js";
import {
  WritingDirectionProvider,
  useDir,
} from "../WritingDirectionProvider.js";

const Child: FC = () => {
  const { dir, toggleDir } = useDir();
  return (
    <button type="button" onClick={toggleDir}>
      {dir}
    </button>
  );
};

describe("WritingDirectionProvider", () => {
  it('should default to the root html dir prop if it exists or fallback to "ltr"', () => {
    document.documentElement.setAttribute("dir", "rtl");

    let { unmount } = render(
      <WritingDirectionProvider>
        <span />
      </WritingDirectionProvider>
    );
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");

    ({ unmount } = render(
      <WritingDirectionProvider>
        <span />
      </WritingDirectionProvider>
    ));
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");
  });

  it("should update the root html with the defaultDir", () => {
    expect(document.documentElement).not.toHaveAttribute("dir");

    const { unmount } = render(
      <WritingDirectionProvider defaultDir="ltr">
        <span />
      </WritingDirectionProvider>
    );

    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    unmount();
    expect(document.documentElement).not.toHaveAttribute("dir");
  });

  it("should clone the dir into a child element", () => {
    render(
      <WritingDirectionProvider defaultDir="ltr">
        <WritingDirectionProvider defaultDir="rtl">
          <span data-testid="span" />
        </WritingDirectionProvider>
      </WritingDirectionProvider>
    );

    const span = screen.getByTestId("span");
    expect(span).toHaveAttribute("dir", "rtl");
  });

  it("should allow a child component to access and toggle the direction", () => {
    render(
      <WritingDirectionProvider>
        <Child />
      </WritingDirectionProvider>
    );

    const button = screen.getByRole("button");
    expect(document.documentElement).toHaveAttribute("dir", "ltr");
    expect(button).toHaveTextContent("ltr");
    fireEvent.click(button);
    expect(document.documentElement).toHaveAttribute("dir", "rtl");
    expect(button).toHaveTextContent("rtl");
  });

  it("should toggle the correct parent with multiple Dir components", () => {
    render(
      <WritingDirectionProvider>
        <WritingDirectionProvider defaultDir="rtl">
          <Child />
        </WritingDirectionProvider>
      </WritingDirectionProvider>
    );

    const button = screen.getByRole("button");
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

    expect(toggleDir).toThrow(
      "Tried to toggle the current writing direction without initializing the `Dir` component."
    );
  });
});
