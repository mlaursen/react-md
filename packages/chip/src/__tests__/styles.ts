import { chip, chipContent } from "../styles";

describe("chip", () => {
  it("should be callable without any arguments", () => {
    expect(chip()).toMatchSnapshot();
  });
});

describe("chipContent", () => {
  it("should be callable without any arguments", () => {
    expect(chipContent()).toMatchSnapshot();
  });
});
