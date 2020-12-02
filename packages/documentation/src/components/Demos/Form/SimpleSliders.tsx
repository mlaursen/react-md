import React, { ReactElement } from "react";
import { SimpleSlider, useSimpleSlider } from "@react-md/form";
import { VolumeOffSVGIcon, VolumeUpSVGIcon } from "@react-md/material-icons";

import { useId } from "components/IdProvider";

import SlidersContainer from "./SlidersContainer";

export default function SimpleSliders(): ReactElement | null {
  const [_value1, controls1] = useSimpleSlider();
  const [_value2, controls2] = useSimpleSlider(20);
  const [_value3, controls3] = useSimpleSlider(0, {
    min: 0,
    max: 10,
    step: 0.5,
  });
  const [_value4, controls4] = useSimpleSlider();
  const [_value5, controls5] = useSimpleSlider(8, { min: 0, max: 10 });
  const [_disabled, disabledControls] = useSimpleSlider(20);
  return (
    <>
      <SlidersContainer>
        <SimpleSlider baseId={useId()} label="Horizontal" {...controls1} />
        <SimpleSlider
          baseId={useId()}
          label="Inverse"
          {...controls2}
          inversed
        />
        <SimpleSlider
          baseId={useId()}
          label="Disabled"
          {...disabledControls}
          disabled
        />
        <SimpleSlider
          baseId={useId()}
          label="Volume"
          {...controls3}
          beforeAddon={<VolumeOffSVGIcon />}
          afterAddon={<VolumeUpSVGIcon />}
        />
      </SlidersContainer>
      <SlidersContainer vertical>
        <SimpleSlider
          baseId={useId()}
          thumbLabel="Vertical Slider 1"
          {...controls4}
          vertical
        />
        <SimpleSlider
          baseId={useId()}
          thumbLabel="Vertical Slider 2"
          {...controls5}
          vertical
          inversed
        />
        <SimpleSlider
          baseId={useId()}
          thumbLabel="Disabled Vertical Slider"
          {...disabledControls}
          disabled
          vertical
        />
      </SlidersContainer>
    </>
  );
}
