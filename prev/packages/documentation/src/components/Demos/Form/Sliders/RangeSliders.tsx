import type { ReactElement } from "react";
import { RangeSlider, useRangeSlider } from "@react-md/form";
import { useId } from "components/IdProvider";

import SlidersContainer from "./SlidersContainer";

export default function RangeSliders(): ReactElement | null {
  const [_value1, controls1] = useRangeSlider();
  const [_value2, controls2] = useRangeSlider([10, 60]);
  const [_value3, controls3] = useRangeSlider([10, 20], { min: 0, max: 50 });
  const [_value4, controls4] = useRangeSlider([10, 60]);
  const [_value5, controls5] = useRangeSlider([10, 20], { min: 0, max: 50 });
  const [_value6, controls6] = useRangeSlider([40, 70]);
  return (
    <>
      <SlidersContainer>
        <RangeSlider baseId={useId()} {...controls1} label="Horizontal" />
        <RangeSlider
          baseId={useId()}
          label="Horizontal"
          {...controls2}
          disabled
        />
        <RangeSlider baseId={useId()} label="Horizontal" {...controls3} />
      </SlidersContainer>
      <SlidersContainer vertical>
        <RangeSlider
          baseId={useId()}
          label="Vertical"
          {...controls4}
          vertical
        />
        <RangeSlider
          baseId={useId()}
          label="Vertical"
          {...controls5}
          vertical
        />
        <RangeSlider
          baseId={useId()}
          label="Vertical"
          {...controls6}
          vertical
          disabled
        />
      </SlidersContainer>
    </>
  );
}
