import React, { FC } from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";

import {
  toCSSVariableName,
  fixVariables,
  createCSSVariablesStyle,
  useDocumentCSSVariables,
  CSSVariable,
} from "../utils";

describe("utils", () => {
  describe("toCSSVariableName", () => {
    it("should prefix a string with `--` if it does not start with it", () => {
      expect(toCSSVariableName("name")).toBe("--name");
      expect(toCSSVariableName("hello-world")).toBe("--hello-world");
      expect(toCSSVariableName("1")).toBe("--1");
      expect(toCSSVariableName("1-2-3")).toBe("--1-2-3");

      expect(toCSSVariableName("--name")).toBe("--name");
      expect(toCSSVariableName("--hello-world")).toBe("--hello-world");
      expect(toCSSVariableName("--1")).toBe("--1");
      expect(toCSSVariableName("--1-2-3")).toBe("--1-2-3");
    });

    it("should prefix a string with whatever prefix value if it does not start with it", () => {
      expect(toCSSVariableName("name", "--")).toBe("--name");
      expect(toCSSVariableName("--name", "--")).toBe("--name");

      expect(toCSSVariableName("name", "--rmd-")).toBe("--rmd-name");
      expect(toCSSVariableName("--rmd-name", "--rmd-")).toBe("--rmd-name");

      expect(toCSSVariableName("name", "-r-")).toBe("-r-name");
      expect(toCSSVariableName("-r-name", "-r-")).toBe("-r-name");
    });
  });

  describe("fixVariables", () => {
    it("should apply the toCSSVariableName function to all names in the list", () => {
      const variables = [
        { name: "name", value: "" },
        { name: "hello-world", value: "#000" },
        { name: "1", value: "1" },
        { name: "1-2-3", value: "rgba(1, 2, 3, .12)" },
        { name: "--name", value: "" },
        { name: "--hello-world", value: "#000" },
        { name: "--1", value: "1" },
        { name: "--1-2-3", value: "rgba(1, 2, 3, .12)" },
      ];

      expect(fixVariables(variables)).toEqual([
        { name: "--name", value: "" },
        { name: "--hello-world", value: "#000" },
        { name: "--1", value: "1" },
        { name: "--1-2-3", value: "rgba(1, 2, 3, .12)" },
        { name: "--name", value: "" },
        { name: "--hello-world", value: "#000" },
        { name: "--1", value: "1" },
        { name: "--1-2-3", value: "rgba(1, 2, 3, .12)" },
      ]);

      expect(fixVariables(variables, "--")).toEqual([
        { name: "--name", value: "" },
        { name: "--hello-world", value: "#000" },
        { name: "--1", value: "1" },
        { name: "--1-2-3", value: "rgba(1, 2, 3, .12)" },
        { name: "--name", value: "" },
        { name: "--hello-world", value: "#000" },
        { name: "--1", value: "1" },
        { name: "--1-2-3", value: "rgba(1, 2, 3, .12)" },
      ]);

      const variables2 = variables.slice(0, 4);
      expect(fixVariables(variables2, "--rmd-")).toEqual([
        { name: "--rmd-name", value: "" },
        { name: "--rmd-hello-world", value: "#000" },
        { name: "--rmd-1", value: "1" },
        { name: "--rmd-1-2-3", value: "rgba(1, 2, 3, .12)" },
      ]);
    });
  });

  describe("createCSSVariablesStyle", () => {
    it("should return the style argument or undefined when there are no variables", () => {
      expect(createCSSVariablesStyle([])).toBeUndefined();
      expect(createCSSVariablesStyle([], undefined)).toBeUndefined();

      const style = { left: 0 };
      expect(createCSSVariablesStyle([], style)).toBe(style);
    });

    it("should return a style object containing the correct values", () => {
      const variables = [
        { name: "name", value: "" },
        { name: "hello-world", value: "#000" },
        { name: "1", value: "1" },
        { name: "1-2-3", value: "rgba(1, 2, 3, .12)" },
      ];

      const expected = {
        "--name": "",
        "--hello-world": "#000",
        "--1": "1",
        "--1-2-3": "rgba(1, 2, 3, .12)",
      };

      expect(createCSSVariablesStyle(variables)).toEqual(expected);
    });

    it("should should return a merged style object", () => {
      const variables = [
        { name: "name", value: "" },
        { name: "hello-world", value: "#000" },
        { name: "1", value: "1" },
        { name: "1-2-3", value: "rgba(1, 2, 3, .12)" },
      ];

      const style1 = {
        left: 0,
        top: 0,
      };
      const expected1 = {
        left: 0,
        top: 0,
        "--name": "",
        "--hello-world": "#000",
        "--1": "1",
        "--1-2-3": "rgba(1, 2, 3, .12)",
      };

      const style2 = {
        left: 0,
        top: 0,
        "--custom-var": "#000",
      };
      const expected2 = {
        left: 0,
        top: 0,
        "--custom-var": "#000",
        "--name": "",
        "--hello-world": "#000",
        "--1": "1",
        "--1-2-3": "rgba(1, 2, 3, .12)",
      };

      expect(createCSSVariablesStyle(variables, style1)).toEqual(expected1);
      expect(createCSSVariablesStyle(variables, style2)).toEqual(expected2);
    });

    it("should prefer the latest defined css variable definition", () => {
      const variables = [
        { name: "name", value: "ignored" },
        { name: "hello-world", value: "ignored" },
        { name: "1", value: "ignored" },
        { name: "1-2-3", value: "ignored" },
        { name: "--name", value: "" },
        { name: "--hello-world", value: "#000" },
        { name: "--1", value: "1" },
        { name: "--1-2-3", value: "rgba(1, 2, 3, .12)" },
      ];

      const expected1 = {
        "--name": "",
        "--hello-world": "#000",
        "--1": "1",
        "--1-2-3": "rgba(1, 2, 3, .12)",
      };

      expect(createCSSVariablesStyle(variables)).toEqual(expected1);

      const style = {
        "--name": "IGNORED AS WELL",
        "--custom": "#323232",
        left: 12,
      };

      const expected2 = {
        "--custom": "#323232",
        left: 12,
        "--name": "",
        "--hello-world": "#000",
        "--1": "1",
        "--1-2-3": "rgba(1, 2, 3, .12)",
      };
      expect(createCSSVariablesStyle(variables, style)).toEqual(expected2);
    });
  });

  describe("useDocumentCSSVariables", () => {
    let container: HTMLElement | null = null;
    beforeEach(() => {
      container = document.createElement("div");
      document.body.appendChild(container);

      // looks like the setProperty and getPropertyValue are mocked out, so
      // can add a fake implementation for tests
      const style = document.documentElement.style as any;
      style.setProperty = (name: string, value: string) => {
        style[name] = value;
      };

      style.getPropertyValue = (name: string) => style[name];
    });

    const Test: FC<{ variables: CSSVariable[] }> = ({ variables }) => {
      useDocumentCSSVariables(variables);
      return null;
    };

    afterEach(() => {
      document.body.removeChild(container as HTMLElement);
      container = null;
    });

    it("should apply each css variable to the root documentElement", () => {
      const variables = [
        { name: "name", value: "" },
        { name: "hello-world", value: "#000" },
        { name: "1", value: "1" },
        { name: "1-2-3", value: "rgba(1, 2, 3, .12)" },
      ];

      act(() => {
        render(<Test variables={variables} />, container);
      });

      const rootStyle = document.documentElement.style;
      expect(rootStyle.getPropertyValue("--name")).toBe("");
      expect(rootStyle.getPropertyValue("--hello-world")).toBe("#000");
      expect(rootStyle.getPropertyValue("--1")).toBe("1");
      expect(rootStyle.getPropertyValue("--1-2-3")).toBe("rgba(1, 2, 3, .12)");

      const nextVariables = variables.slice();
      nextVariables[0].value = "SOMETHING_NEW";
      act(() => {
        render(<Test variables={nextVariables} />, container);
      });

      expect(rootStyle.getPropertyValue("--name")).toBe("SOMETHING_NEW");
      expect(rootStyle.getPropertyValue("--hello-world")).toBe("#000");
      expect(rootStyle.getPropertyValue("--1")).toBe("1");
      expect(rootStyle.getPropertyValue("--1-2-3")).toBe("rgba(1, 2, 3, .12)");
    });
  });
});
