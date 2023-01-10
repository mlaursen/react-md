import { visualMedia } from "../styles";

describe("visualMedia styles", () => {
  it("should return the correct class name", () => {
    expect(visualMedia()).toBe("rmd-visual-media");
    expect(visualMedia({})).toBe("rmd-visual-media");

    const result1 = visualMedia({ className: "custom-class-name" });
    const result2 = visualMedia({ scaleToContainer: true });
    const result3 = visualMedia({ forcedAspectRatio: true });
    const result4 = visualMedia({
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
