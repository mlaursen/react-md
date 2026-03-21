import { describe, expect, it } from "vitest";

import { renderWithEverything } from "@/test-utils.jsx";

import App from "../App.jsx";

describe("App", () => {
  it("should render without crashing", () => {
    expect(() => renderWithEverything(<App />)).not.toThrow();
  });
});
