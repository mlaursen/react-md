import { describe, expect, it, jest } from "@jest/globals";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type RefObject,
} from "react";
import { fireEvent, render } from "../../test-utils/index.js";

import { textPrimaryColorVar } from "../cssVars.js";
import { type CSSVariableName, type DefinedCSSVariableName } from "../types.js";
import {
  useCSSVariables,
  type ReadonlyCSSVariableList,
} from "../useCSSVariables.js";

declare module "react" {
  interface CSSProperties {
    "--test-defined"?: string | number;
  }
}

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
      // this is an error because the global CSSProperties have not been augmented
      // @ts-expect-error
      style = useCSSVariables([{ name: "--test", value: "3rem" }], true);

      // this one should work without issue since it was added at the top of the test
      const _style2 = useCSSVariables(
        [{ name: "--test-defined", value: "1" }],
        true
      );
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

    expect(warn).not.toHaveBeenCalled();
    render(<Test />);
    expect(warn).toHaveBeenCalledWith(
      `The "--test" css variable has already been set to "1rem" ` +
        `on the root element and will be overwritten to "3rem". There might be conflicting overrides.`
    );
  });

  it("should allow for a custom root node using refs", () => {
    function Child(props: { rootRef: RefObject<HTMLElement> }): null {
      const { rootRef } = props;

      const variables = useMemo<ReadonlyCSSVariableList<CSSVariableName>>(
        () => [{ name: "--test", value: "100px" }],
        []
      );
      useCSSVariables(variables, rootRef);

      return null;
    }

    function Test(): ReactElement {
      const rootRef = useRef<HTMLDivElement>(null);
      const [style, setStyle] = useState<CSSProperties | undefined>();

      return (
        <div data-testid="div" ref={rootRef} style={style}>
          <button
            type="button"
            onClick={() => {
              setStyle({ background: "red" });
            }}
          >
            Style
          </button>
          <Child rootRef={rootRef} />
        </div>
      );
    }

    const { getByTestId, getByRole } = render(<Test />);
    const div = getByTestId("div");
    const button = getByRole("button", { name: "Style" });

    expect(div.style.getPropertyValue("--test")).toBe("100px");
    expect(div).toMatchSnapshot();

    // this is just to make sure that adding inline style does not remove the
    // custom properties
    fireEvent.click(button);
    expect(div.style.getPropertyValue("--test")).toBe("100px");
    expect(div.style.backgroundColor).toBe("red");
    expect(div).toMatchSnapshot();
  });

  it("should allow strictly typing the css variable names to react-md theme variables", () => {
    function Test(): null {
      useCSSVariables<DefinedCSSVariableName>([
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
