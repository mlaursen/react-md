import { render } from "@testing-library/react";
import type { CSSProperties, ReactElement } from "react";
import type { ThemeCssVarName } from "../cssVars";
import { textPrimaryColorVar } from "../cssVars";

import { useCSSVariables } from "../useCSSVariables";

describe("useCSSVariables", () => {
  it("should modify the html element with the custom properties by default", () => {
    function Test(): null {
      useCSSVariables([{ name: "--test", value: "3rem" }]);
      return null;
    }

    const html = document.documentElement;
    expect(html.style.getPropertyValue("--test")).toBe("");

    const { unmount } = render(<Test />);
    expect(html.style.getPropertyValue("--test")).toBe("3rem");

    unmount();
    expect(html.style.getPropertyValue("--test")).toBe("");
  });

  it("should return a style object if the local argument is `true`", () => {
    let style: CSSProperties | undefined;
    function Test(): ReactElement {
      style = useCSSVariables([{ name: "--test", value: "3rem" }], true);
      return <div style={style} />;
    }

    const html = document.documentElement;
    expect(html.style.getPropertyValue("--test")).toBe("");

    const { unmount } = render(<Test />);
    expect(html.style.getPropertyValue("--test")).toBe("");
    expect(style).toEqual({ "--test": "3rem" });

    unmount();
    expect(html.style.getPropertyValue("--test")).toBe("");
  });

  it("should warn about overriding variables for non-production environments", () => {
    expect(process.env.NODE_ENV).not.toBe("production");
    const html = document.documentElement;
    const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
    html.style.setProperty("--test", "1rem");

    function Test(): null {
      useCSSVariables([{ name: "--test", value: "3rem" }]);
      return null;
    }

    expect(warn).not.toBeCalled();
    render(<Test />);
    expect(warn).toBeCalledWith(
      `The "--test" css variable has already been set to "1rem" ` +
        `on the root element and will be overwritten to "3rem". There might be conflicting overrides.`
    );
  });

  it("should allow strictly typing the css variable names to react-md theme variables", () => {
    function Test(): null {
      useCSSVariables<ThemeCssVarName>([
        {
          name: "--rmd-background-color",
          value: "#000",
        },
        {
          name: textPrimaryColorVar,
          value: "rgba(0, 0, 0, 0.12)",
        },
        {
          // @ts-expect-error
          name: "--rdm-on-primary-color",
          value: "orange",
        },
        // @ts-expect-error
        { name: "--test", value: "3rem" },
      ]);
      return null;
    }

    const html = document.documentElement;
    expect(html.style.getPropertyValue("--rmd-background-color")).toBe("");
    expect(html.style.getPropertyValue(textPrimaryColorVar)).toBe("");
    expect(html.style.getPropertyValue("--rdm-on-primary-color")).toBe("");
    expect(html.style.getPropertyValue("--test")).toBe("");

    const { unmount } = render(<Test />);
    expect(html.style.getPropertyValue("--rmd-background-color")).toBe("#000");
    expect(html.style.getPropertyValue(textPrimaryColorVar)).toBe(
      "rgba(0, 0, 0, 0.12)"
    );
    expect(html.style.getPropertyValue("--rdm-on-primary-color")).toBe(
      "orange"
    );
    expect(html.style.getPropertyValue("--test")).toBe("3rem");

    unmount();
    expect(html.style.getPropertyValue("--rmd-background-color")).toBe("");
    expect(html.style.getPropertyValue("--rdm-on-primary-color")).toBe("");
    expect(html.style.getPropertyValue("--test")).toBe("");
  });
});
