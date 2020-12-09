import React, { ReactElement } from "react";
import { RangeSlider, useRangeSlider } from "@react-md/form";
import { useId } from "components/IdProvider";

import SlidersContainer from "./SlidersContainer";

export default function RangeSliders(): ReactElement | null {
  const [_value1, controls1] = useRangeSlider();
  const [_value2, controls2] = useRangeSlider([10, 60]);
  const [_value3, controls3] = useRangeSlider([10, 20], { min: 0, max: 50 });
  const [_value4, controls4] = useRangeSlider([10, 60]);
  const [_value5, controls5] = useRangeSlider([10, 20], { min: 0, max: 50 });
  return (
    <>
      <SlidersContainer>
        <RangeSlider
          baseId={useId()}
          {...controls1}
          label="Horizontal"
          thumb1Label="Min"
          thumb2Label="Max"
        />
        <RangeSlider
          baseId={useId()}
          label="Horizontal"
          {...controls2}
          thumb1Label="Min"
          thumb2Label="Max"
        />
        <RangeSlider
          baseId={useId()}
          label="Horizontal"
          {...controls3}
          thumb1Label="Min"
          thumb2Label="Max"
        />
      </SlidersContainer>
      <SlidersContainer vertical>
        <RangeSlider
          baseId={useId()}
          label="Vertical"
          {...controls4}
          thumb1Label="Min"
          thumb2Label="Max"
          vertical
        />
        <RangeSlider
          baseId={useId()}
          label="Vertical"
          {...controls5}
          thumb1Label="Min"
          thumb2Label="Max"
          vertical
        />
      </SlidersContainer>
    </>
  );
}
