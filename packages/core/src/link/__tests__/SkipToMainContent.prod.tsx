import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import { type FC, type ReactNode } from "react";

import { fireEvent, render, screen } from "../../test-utils/index.js";

const MainIdWrapper: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    {children}
    <main id="main-id" tabIndex={-1} />
  </>
);

beforeAll(() => {
  // this is caused by next defining process.env.NODE_ENV as readonly 'development' | 'production' | 'test'
  // @ts-ignore
  process.env.NODE_ENV = "production";
});

// NOTE: This was moved to a separate file and dynamic imports to allow the new
// `useDevEffect` to work correctly
describe("SkipToMainContent", () => {
  it("should not throw an error if the mainId cannot be found for production", async () => {
    const { SkipToMainContent } = await import("../SkipToMainContent.js");

    expect(() =>
      render(<SkipToMainContent mainId="not-found" />)
    ).not.toThrow();
  });

  it("should defer finding the main element to the click event in production", async () => {
    const { SkipToMainContent } = await import("../SkipToMainContent.js");

    const querySelector = jest.spyOn(document, "querySelector");
    render(<SkipToMainContent />, {
      wrapper: MainIdWrapper,
    });
    expect(querySelector).not.toHaveBeenCalled();

    const link = screen.getByRole("link", { name: "Skip to main content" });
    const main = screen.getByRole("main");
    expect(document.body).toHaveFocus();

    fireEvent.click(link);
    expect(main).toHaveFocus();
    expect(querySelector).toHaveBeenCalledTimes(1);
  });
});
