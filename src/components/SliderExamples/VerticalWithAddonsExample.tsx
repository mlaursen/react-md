import { Fieldset, Form, Legend, Slider, useSlider } from "@react-md/form";
import VolumeOffIcon from "@react-md/material-icons/VolumeOffIcon";
import VolumeUpIcon from "@react-md/material-icons/VolumeUpIcon";
import type { ReactElement } from "react";
import { useId } from "react";

export function VerticalWithAddonsExample(): ReactElement {
  const legendId = useId();
  const slider = useSlider({ defaultValue: 20 });

  // The slider hook returns the current value and a React.useState setter if
  // you need to control the value manually
  // const { value, setValue } = slider;

  return (
    <Form>
      <Fieldset>
        <Legend id={legendId} style={{ marginBottom: "1rem" }}>
          Volume
        </Legend>
        <Slider
          aria-labelledby={legendId}
          {...slider}
          beforeAddon={<VolumeOffIcon />}
          afterAddon={<VolumeUpIcon />}
          vertical
        />
      </Fieldset>
    </Form>
  );
}
