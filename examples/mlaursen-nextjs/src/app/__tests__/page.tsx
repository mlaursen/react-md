import { describe, expect, it } from "@jest/globals";

import { renderWithEverything } from "@/test-utils.jsx";

import Page from "../page.jsx";

describe("page", () => {
  it("should render correctly", () => {
    renderWithEverything(<Page />);
    expect(document.body).toMatchSnapshot();
  });
});
