import { responsiveItem } from "../styles";

describe("responsiveItem styles", () => {
  it("should return the correct class name", () => {
    expect(responsiveItem()).toBe("rmd-responsive-item");
    expect(responsiveItem({})).toBe("rmd-responsive-item");

    const result1 = responsiveItem({ className: "custom-class-name" });
    const result2 = responsiveItem({ scaleToContainer: true });
    const result3 = responsiveItem({ forcedAspectRatio: true });
    const result4 = responsiveItem({
      className: "custom-class-name",
      scaleToContainer: true,
      forcedAspectRatio: true,
    });

    expect(result1).toContain("custom-class-name");
    expect(result1).toMatchSnapshot();

    expect(result2).toContain("--scale");
    expect(result2).toMatchSnapshot();

    expect(result3).toContain("--aspect-ratio");
    expect(result3).toMatchSnapshot();

    expect(result4).toContain("--scale");
    expect(result4).toContain("--aspect-ratio");
    expect(result4).toContain("custom-class-name");
    expect(result4).toMatchSnapshot();
  });
});
