import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { SkipToMainContent } from "../SkipToMainContent";

describe("SkipToMainContent", () => {
  it("should render correctly", () => {
    const { container, rerender } = render(<SkipToMainContent mainId="" />);
    expect(container).toMatchSnapshot();

    rerender(
      <SkipToMainContent mainId="main-content" id="skip" unstyled>
        Skip
      </SkipToMainContent>
    );
    expect(container).toMatchSnapshot();
  });

  it("should focus the main element when clicked", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <>
        <SkipToMainContent mainId="main-content" onClick={onClick} />
        <main tabIndex={-1} id="main-content" />
      </>
    );

    fireEvent.click(getByRole("link"));
    expect(onClick).toBeCalledTimes(1);

    expect(document.activeElement).toBe(getByRole("main"));
  });

  describe("non-prod", () => {
    it("should log an error if there is no main element with the provided mainId when clicked", () => {
      const error = jest.spyOn(console, "error").mockImplementation(() => {});
      const { getByRole } = render(<SkipToMainContent mainId="main-content" />);

      fireEvent.click(getByRole("link"));
      expect(error).toBeCalledWith(
        'Unable to find a main element to focus with an id of: "main-content".'
      );

      error.mockRestore();
    });

    it("should log an error if there is no main element with the provided mainI when clicked and try to find a <main> id to suggest", () => {
      const error = jest.spyOn(console, "error").mockImplementation(() => {});
      const { getByRole } = render(
        <>
          <SkipToMainContent mainId="main-content" />
          <main tabIndex={-1} id="mian-content" />
        </>
      );

      fireEvent.click(getByRole("link"));
      expect(error).toBeCalledWith(
        'Unable to find a main element to focus with an id of: "main-content".'
      );
      expect(error).toBeCalledWith(
        `However, a "<main>" element was found with an id: "mian-content". Should this be the "mainId" prop for the "SkipToMainContent" component?`
      );

      error.mockRestore();
    });
  });

  describe("prod", () => {
    const env = process.env.NODE_ENV;
    beforeAll(() => {
      process.env.NODE_ENV = "production";
    });

    afterAll(() => {
      process.env.NODE_ENV = env;
    });

    it("should not log an error if there is no main element with the provided mainId when clicked", () => {
      expect(process.env.NODE_ENV).toBe("production");
      const error = jest.spyOn(console, "error").mockImplementation(() => {});
      const { getByRole } = render(<SkipToMainContent mainId="main-content" />);

      fireEvent.click(getByRole("link"));
      expect(error).not.toBeCalled();

      error.mockRestore();
    });

    it("should not log an error if there is no main element with the provided mainI when clicked and try to find a <main> id to suggest", () => {
      expect(process.env.NODE_ENV).toBe("production");
      const error = jest.spyOn(console, "error").mockImplementation(() => {});
      const { getByRole } = render(
        <>
          <SkipToMainContent mainId="main-content" />
          <main tabIndex={-1} id="mian-content" />
        </>
      );

      fireEvent.click(getByRole("link"));
      expect(error).not.toBeCalled();

      error.mockRestore();
    });
  });
});
