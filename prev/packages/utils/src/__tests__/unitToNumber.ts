import { unitToNumber } from "../unitToNumber";

describe("unitToNumber", () => {
  it("should return the correct value for numbers and px strings", () => {
    expect(unitToNumber(0)).toBe(0);
    expect(unitToNumber(1)).toBe(1);
    expect(unitToNumber(-16)).toBe(-16);

    expect(unitToNumber("0")).toBe(0);
    expect(unitToNumber("-4px")).toBe(-4);
    expect(unitToNumber("16px")).toBe(16);
  });

  it("should parse the fontSize style for em/rem units", () => {
    const defaultStyle = window.getComputedStyle(document.documentElement);
    const getComputedStyle = jest
      .spyOn(window, "getComputedStyle")
      .mockImplementation((element) => {
        if (element === document.documentElement) {
          return {
            ...defaultStyle,
            fontSize: "13px",
          };
        }

        return {
          ...defaultStyle,
          fontSize: "14px",
        };
      });

    const container = document.createElement("div");
    const element = document.createElement("div");
    container.appendChild(element);

    expect(unitToNumber("1.5em")).toBe(19.5);
    expect(unitToNumber(".5em")).toBe(6.5);
    expect(unitToNumber("1.5rem")).toBe(19.5);
    expect(unitToNumber(".5rem")).toBe(6.5);

    expect(unitToNumber("1.5em", { element })).toBe(21);
    expect(unitToNumber(".5em", { element })).toBe(7);
    expect(unitToNumber("1.5rem", { element })).toBe(19.5);
    expect(unitToNumber(".5rem", { element })).toBe(6.5);

    getComputedStyle.mockRestore();
  });
});
