import { type FC, type ReactNode, createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "../../test-utils/index.js";
import { SkipToMainContent } from "../SkipToMainContent.js";

const MainIdWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    {children}
    <main id="main-id" tabIndex={-1} />
  </>
);

describe("SkipToMainContent", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLAnchorElement>();
    const props = {
      ref,
      mainId: "main-id",
    } as const;
    const { rerender } = render(<SkipToMainContent {...props} />, {
      wrapper: MainIdWrapper,
    });

    const link = screen.getByRole("link", { name: "Skip to main content" });
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    expect(ref.current).toBe(link);
    expect(link).toMatchSnapshot();

    rerender(
      <SkipToMainContent
        {...props}
        style={{ opacity: 0.5 }}
        className="custom-class-name"
      />
    );
    expect(link).toMatchSnapshot();
  });

  it("should automatically find the main element for convenience", () => {
    expect(() =>
      render(<SkipToMainContent />, { wrapper: MainIdWrapper })
    ).not.toThrow();
  });

  it("should throw an error if the mainId cannot be found", () => {
    // hide thrown error in test reports
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<SkipToMainContent mainId="not-found" />)).toThrow(
      'Unable to find a main element to focus with an id of "not-found". There should be at least one <main> element or an element with role="main" on the page for accessibility.'
    );
  });

  it('should throw an error if the mainId cannot be found and suggest the id for a main element or an element with role="main"', () => {
    // hide thrown error in test reports
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <>
          <SkipToMainContent mainId="not-found" />
          <main id="main-id" />
        </>
      )
    ).toThrow(
      'Unable to find a main element to focus with an id of "not-found" but a main element was found with an id of "main-id".'
    );
  });

  it("should focus the main element when clicked unless the provided onClick prop calls event.stopPropagation()", () => {
    const { rerender } = render(<SkipToMainContent mainId="main-id" />, {
      wrapper: MainIdWrapper,
    });

    const link = screen.getByRole("link", { name: "Skip to main content" });
    const main = screen.getByRole("main");
    expect(document.body).toHaveFocus();

    fireEvent.click(link);
    expect(main).toHaveFocus();

    main.blur();
    expect(document.body).toHaveFocus();
    rerender(
      <SkipToMainContent
        mainId="main-id"
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    );
    fireEvent.click(link);
    expect(document.body).toHaveFocus();
  });
});
