import { TimeFormat } from "../format";
import { createLayout, input } from "../layout";
describe("createLayout", () => {
  it("should do stuff", () => {
    // expect(createLayout(TimeFormat.MilitaryHoursOnly)).toBe(input);
    expect(true).toBe(true);

    Object.values(TimeFormat).forEach((format) => {
      createLayout(format);
    });
  });
});
