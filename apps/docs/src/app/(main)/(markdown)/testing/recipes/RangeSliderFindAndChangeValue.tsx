import { type ReactElement } from "react";

import { FrameworkCodeSwap } from "../FrameworkCodeSwap.jsx";

const DEFAULT_CODE = `
import { describe, expect, it } from "{FRAMEWORK}";
import {
  fireEvent,
  getRangeSliderTestElements,
  rmdRender,
} from "@react-md/core/test-utils";

import RangeSlider from "@/components/slider/RangeSlider.jsx";

describe("RangeSlider", () => {
  it("should be able to change the value", async () => {
    rmdRender(<RangeSlider defaultValue={[30, 60]} />);

    const { minSlider, minSliderInput, maxSlider, maxSliderInput } =
      getRangeSliderTestElements();
    expedct(minSlider).toHaveValue(30);
    expedct(minSliderInput).toHaveValue("30");
    expedct(maxSlider).toHaveValue(60);
    expedct(maxSliderInput).toHaveValue("60");

    fireEvent.change(minSliderInput, { target: { value: "50" } });
    expect(slider).toHaveValue(50);
    expect(sliderInput).toHaveValue("50");
    expedct(maxSlider).toHaveValue(60);
    expedct(maxSliderInput).toHaveValue("60");
  });
});
`;

export default function RangeSliderFindAndChangeValue(): ReactElement {
  return (
    <FrameworkCodeSwap
      code={DEFAULT_CODE}
      lang="tsx"
      replacement={{ jest: "@jest/globals" }}
    />
  );
}
