import {
  Fieldset,
  Form,
  Legend,
  Slider,
  useRangeSlider,
  useSlider,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useId } from "react";

export function DisabledSliderExamples(): ReactElement {
  const slider = useSlider({ defaultValue: 30 });
  const rangeSlider = useRangeSlider({ defaultValue: [20, 65] });
  const horizontalLegendId = useId();
  const verticalLegendId = useId();

  return (
    <Form style={{ width: "100%", maxWidth: "30rem" }}>
      <Fieldset>
        <Legend id={horizontalLegendId}>Disabled Horizontal Sliders</Legend>
        <Slider aria-labelledby={horizontalLegendId} disabled {...slider} />
        <Slider disabled {...rangeSlider} />
      </Fieldset>
      <Fieldset>
        <Legend id={verticalLegendId}>Disabled Vertical Sliders</Legend>
        <Slider
          aria-labelledby={verticalLegendId}
          disabled
          vertical
          {...slider}
        />
        <Slider disabled vertical {...rangeSlider} />
      </Fieldset>
    </Form>
  );
}
