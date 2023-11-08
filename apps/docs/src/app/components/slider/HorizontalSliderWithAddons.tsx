"use client";
import { Fieldset, Form, Legend, Slider, box, useSlider } from "@react-md/core";
import VolumeOffOutlinedIcon from "@react-md/material-icons/VolumeOffOutlinedIcon";
import VolumeUpOutlinedIcon from "@react-md/material-icons/VolumeUpOutlinedIcon";
import { useId, type ReactElement } from "react";

export default function HorizontalSliderWithAddons(): ReactElement {
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
        />
      </Fieldset>
    </Form>
  );
}
