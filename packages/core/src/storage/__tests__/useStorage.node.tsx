/** @jest-environment node */
import { describe, expect, it } from "@jest/globals";
import { renderToString } from "react-dom/server";

import { useStorage } from "../useStorage.js";

describe("useStorage", () => {
  it("should not error while rendering in a node environment and just return the defaultValue", () => {
    let currentValue = "";
    function Test() {
      const { value } = useStorage({ key: "test", defaultValue: "100" });
      currentValue = value;

      return <div data-testid="value">{value}</div>;
    }

    expect(renderToString(<Test />)).toMatchSnapshot();

    expect(currentValue).toBe("100");
  });
});
