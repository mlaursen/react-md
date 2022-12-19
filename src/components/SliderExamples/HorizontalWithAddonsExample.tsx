import { Fieldset, Form, Legend, Slider, useSlider } from "@react-md/form";
import VolumeOffIcon from "@react-md/material-icons/VolumeOffIcon";
import VolumeUpIcon from "@react-md/material-icons/VolumeUpIcon";
import type { ReactElement } from "react";
import { useId } from "react";

export function HorizontalWithAddonsExample(): ReactElement {
  const legendId = useId();
  const slider = useSlider({ defaultValue: 20 });

  // The slider hook returns the current value and a React.useState setter if
  // you need to control the value manually
  // const { value, setValue } = slider;

  return (
    <Form style={{ width: "100%", maxWidth: "30rem" }}>
      <Fieldset>
        <Legend id={legendId}>Volume</Legend>
        <Slider
          aria-labelledby={legendId}
          {...slider}
          beforeAddon={<VolumeOffIcon />}
          afterAddon={<VolumeUpIcon />}
        />
      </Fieldset>
    </Form>
  );
}
