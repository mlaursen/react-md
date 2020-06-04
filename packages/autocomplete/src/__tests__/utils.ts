import { createElement } from "react";
import { fuzzyFilter, caseInsensitiveFilter } from "@react-md/utils";

import { FilterFunction } from "../types";
import {
  getResultId,
  getResultLabel,
  getResultValue,
  getFilterFunction,
  noFilter,
} from "../utils";

const div = createElement("div", { className: "class-name" }, "Children");
const span = createElement("span", "Hello");

describe("getResultId", () => {
  it("should generate the correct id by incrementing the provided index by 1", () => {
    expect(getResultId("prefix", 0)).toBe("prefix-result-1");
    expect(getResultId("something-again", 1)).toBe("something-again-result-2");
  });
});

describe("getResultLabel", () => {
  it("should return the result itself if it is a string", () => {
    expect(getResultLabel("", "", "")).toBe("");
    expect(getResultLabel("", "key", "")).toBe("");

    expect(getResultLabel("label", "", "")).toBe("label");
    expect(getResultLabel("label", "label", "")).toBe("label");
    expect(getResultLabel("this is something", "label", "")).toBe(
      "this is something"
    );
  });

  it("should return the labelKey's value property if the result is an object", () => {
    expect(getResultLabel({ label: "Thing" }, "label", "")).toBe("Thing");

    expect(getResultLabel({ label: span }, "label", "")).toBe(span);

    expect(getResultLabel({ label: div, thing: "Thing" }, "label", "")).toBe(
      div
    );
    expect(getResultLabel({ label: div, thing: "Thing" }, "thing", "")).toBe(
      "Thing"
    );
  });

  it("should return null if the labelKey is undefined", () => {
    expect(getResultLabel({}, "label", "")).toBe(null);
    expect(getResultLabel({ thing: "Thing" }, "label", "")).toBe(null);

    expect(getResultLabel({ label: "" }, "label", "")).toBe("");
    expect(getResultLabel({ label: 0 }, "label", "")).toBe(0);
    expect(getResultLabel({ label: null }, "label", "")).toBe(null);
    expect(getResultLabel({ label: false }, "label", "")).toBe(false);
    expect(getResultLabel({ label: true }, "label", "")).toBe(true);
  });

  it("should return the children property if it true-ish", () => {
    expect(getResultLabel({ children: div, label: "Thing" }, "label", "")).toBe(
      div
    );
    expect(getResultLabel({ children: span, label: div }, "label", "")).toBe(
      span
    );
    expect(getResultLabel({ children: null, label: span }, "label", "")).toBe(
      span
    );
  });
});

describe("getResultValue", () => {
  it("should return the result itself if it is a string", () => {
    expect(getResultValue("", "")).toBe("");
    expect(getResultValue("", "key")).toBe("");

    expect(getResultValue("value", "")).toBe("value");
    expect(getResultValue("value", "value")).toBe("value");
    expect(getResultValue("this is something", "value")).toBe(
      "this is something"
    );
  });

  it("should return the valueKey on the result object stringified", () => {
    expect(getResultValue({ value: "Bob" }, "value")).toBe("Bob");
    expect(getResultValue({ name: "Colorado" }, "name")).toBe("Colorado");
    expect(getResultValue({ name: "Colorado", value: "CO" }, "name")).toBe(
      "Colorado"
    );
    expect(getResultValue({ a: 0 }, "a")).toBe("0");
    expect(getResultValue({ a: 1 }, "a")).toBe("1");
  });

  it("should log an error if the valueKey does not return a number or a string", () => {
    const error = "Unable to extract a result value string";

    expect(() => getResultValue({}, "")).toThrowError(error);
    expect(() => getResultValue({}, "label")).toThrowError(error);
    expect(() => getResultValue({ label: null }, "label")).toThrowError(error);
    expect(() => getResultValue({ label: div }, "label")).toThrowError(error);
    expect(() => getResultValue({ label: span }, "label")).toThrowError(error);
    expect(() => getResultValue({ label: [] }, "label")).toThrowError(error);
  });
});

describe("getFilterFunction", () => {
  it('should return the fuzzyFilter function if the filter is the string "fuzzy"', () => {
    expect(getFilterFunction("fuzzy")).toBe(fuzzyFilter);
  });

  it('should return the caseInsensitiveFilter if the filter is the string "case-insensitive"', () => {
    expect(getFilterFunction("case-insensitive")).toBe(caseInsensitiveFilter);
  });

  it('should return the noFilter function if the filter is the string "none"', () => {
    expect(getFilterFunction("none")).toBe(noFilter);
  });

  it("should throw an error for any other strings for non-typescript users", () => {
    // @ts-expect-error
    expect(() => getFilterFunction("")).toThrow(
      'Invalid filter function: "". Supported values are: "fuzzy", "case-insenitive", "none", or a custom function'
    );

    // @ts-expect-error
    expect(() => getFilterFunction("custom")).toThrow(
      'Invalid filter function: "custom". Supported values are: "fuzzy", "case-insenitive", "none", or a custom function'
    );
  });

  it("should returnt he noFilter result for an invalid fulter function if the NODE_ENV is not production", () => {
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    // @ts-expect-error
    expect(getFilterFunction("")).toBe(noFilter);
    // @ts-expect-error
    expect(getFilterFunction("custom")).toBe(noFilter);

    process.env.NODE_ENV = env;
  });

  it("should return the function itself if it is a function", () => {
    expect(getFilterFunction(fuzzyFilter)).toBe(fuzzyFilter);
    expect(getFilterFunction(caseInsensitiveFilter)).toBe(
      caseInsensitiveFilter
    );
    expect(getFilterFunction(noFilter)).toBe(noFilter);

    const custom: FilterFunction = (value, data) =>
      data.filter((d) => !!d && getResultValue(d, "thing").startsWith(value));
    expect(getFilterFunction(custom)).toBe(custom);
  });
});
