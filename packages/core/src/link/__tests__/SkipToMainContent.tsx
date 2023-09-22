import { describe, expect, it, jest } from "@jest/globals";
import { createRef, type FC, type ReactNode } from "react";
import { fireEvent, render } from "../../test-utils/index.js";

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
    const { getByRole, rerender } = render(<SkipToMainContent {...props} />, {
      wrapper: MainIdWrapper,
    });

    const link = getByRole("link", { name: "Skip to main content" });
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
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<SkipToMainContent mainId="not-found" />)).toThrow(
      'Unable to find a main element to focus with an id of "not-found". There should be at least one <main> element or an element with role="main" on the page for accessibility.'
    );
  });

  it('should throw an error if the mainId cannot be found and suggest the id for a main element or an element with role="main"', () => {
    // hide thrown error in test reports
    jest.spyOn(console, "error").mockImplementation(() => {});
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

  it("should not throw an error if the mainId cannot be found for production", () => {
    // this is caused by next defining process.env.NODE_ENV as readonly 'development' | 'production' | 'test'
    // @ts-ignore
    process.env.NODE_ENV = "production";

    expect(() =>
      render(<SkipToMainContent mainId="not-found" />)
    ).not.toThrow();
  });

  it("should focus the main element when clicked unless the provided onClick prop calls event.stopPropagation()", () => {
    const { getByRole, rerender } = render(
      <SkipToMainContent mainId="main-id" />,
      {
        wrapper: MainIdWrapper,
      }
    );

    const link = getByRole("link", { name: "Skip to main content" });
    const main = getByRole("main");
    expect(document.activeElement).toBe(document.body);

    fireEvent.click(link);
    expect(document.activeElement).toBe(main);

    main.blur();
    expect(document.activeElement).toBe(document.body);
    rerender(
      <SkipToMainContent
        mainId="main-id"
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    );
    fireEvent.click(link);
    expect(document.activeElement).toBe(document.body);
  });

  it("should defer finding the main element to the click event in production", () => {
    const { NODE_ENV } = process.env;
    process.env.NODE_ENV = "production";

    const querySelector = jest.spyOn(document, "querySelector");
    const { getByRole } = render(<SkipToMainContent />, {
      wrapper: MainIdWrapper,
    });
    expect(querySelector).not.toHaveBeenCalled();

    const link = getByRole("link", { name: "Skip to main content" });
    const main = getByRole("main");
    expect(document.activeElement).toBe(document.body);

    fireEvent.click(link);
    expect(document.activeElement).toBe(main);
    expect(querySelector).toHaveBeenCalledTimes(1);

    process.env.NODE_ENV = NODE_ENV;
  });
});
