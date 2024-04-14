"use client";
import { box } from "@react-md/core/box/styles";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";
import { useSlider } from "@react-md/core/form/useSlider";
import VolumeOffOutlinedIcon from "@react-md/material-icons/VolumeOffOutlinedIcon";
import VolumeUpOutlinedIcon from "@react-md/material-icons/VolumeUpOutlinedIcon";
import { useId, type ReactElement } from "react";

export default function VerticalSliderWithAddons(): ReactElement {
  const legendId = useId();
  const slider = useSlider();
  // const { value, setValue, min, max, step } = slider;

  return (
    <Form className={box({ fullWidth: true })}>
      <Fieldset fullWidth>
        <Legend id={legendId}>Volume</Legend>
        <Slider
          aria-labelledby={legendId}
          {...slider}
          beforeAddon={<VolumeOffOutlinedIcon />}
          afterAddon={<VolumeUpOutlinedIcon />}
          vertical
        />
      </Fieldset>
    </Form>
  );
}
