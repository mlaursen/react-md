import { describe, expect, it } from "vitest";

import { render } from "@/test-utils.tsx";

import App from "../App.jsx";

describe("App", () => {
  it("should render without crashing", () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
