import { button } from "../buttonStyles.js";

describe("button", () => {
  it("should be callable without any arguments", () => {
    expect(button()).toMatchSnapshot();
  });
});
