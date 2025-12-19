import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.js";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import {
  fireEvent,
  getSliderTestElements,
  rmdRender,
} from "@react-md/core/test-utils";

import HorizontalSlider from "@/components/slider/HorizontalSlider.js";

describe("HorizontalSlider", () => {
  it("should be able to change the value", async () => {
    rmdRender(<HorizontalSlider />);

    // \`name\` is the accessible label for the \`Slider\`
    const { slider, sliderInput } = getSliderTestElements({ name: "Slider" });
    expect(slider).toHaveValue(50);
    expect(sliderInput).toHaveValue("50");

    fireEvent.change(sliderInput, { target: { value: "80" } });
    expect(slider).toHaveValue(80);
    expect(sliderInput).toHaveValue("80");
  });
});
`;

export default function SliderFindAndChangeValue(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
