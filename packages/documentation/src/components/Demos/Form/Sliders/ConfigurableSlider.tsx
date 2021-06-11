import React, { ReactElement, useState } from "react";
import {
  Checkbox,
  Form,
  Select,
  Slider,
  TextField,
  TextFieldWithMessage,
  useNumberField,
  useSlider,
  UseSliderOptions,
} from "@react-md/form";
import { Text } from "@react-md/typography";
import { Grid, GridCell } from "@react-md/utils";

import Code from "components/Code/Code";
import { NfcSVGIcon, SyncSVGIcon } from "@react-md/material-icons";

interface ConfiguredSliderProps extends UseSliderOptions {
  disabled: boolean;
  before: boolean;
  after: boolean;
}

function ConfiguredSlider({
  min,
  max,
  step,
  jump,
  updateOn,
  before,
  after,
  disabled,
}: ConfiguredSliderProps): ReactElement {
  const [value, controls] = useSlider(undefined, {
    min,
    max,
    step,
    jump,
    updateOn,
  });

  return (
    <>
      <Text>{`Current value: ${value}`}</Text>
      <Slider
        baseId="configured-slider"
        {...controls}
        label="Configurable"
        disabled={disabled}
        beforeAddon={before && <SyncSVGIcon />}
        afterAddon={after && <NfcSVGIcon />}
      />
    </>
  );
}

export default function ConfigurableSlider(): ReactElement {
  const [min, minProps, minControls] = useNumberField({
    id: "configurable-slider-min",
    defaultValue: 0,
    disableMessage: true,
    updateOnChange: false,
  });
  const [max, maxProps, maxControls] = useNumberField({
    id: "configurable-slider-max",
    defaultValue: 100,
    disableMessage: true,
    updateOnChange: false,
  });
  const [step, stepProps] = useNumberField({
    id: "configurable-slider-step",
    defaultValue: 1,
    disableMessage: true,
    updateOnChange: false,
  });
  const [jump, jumpProps] = useNumberField({
    id: "configurable-slider-jump",
    disableMessage: true,
    updateOnChange: false,
  });
  const [before, setBefore] = useState(false);
  const [after, setAfter] = useState(false);
  const [disabled, setDisabled] = useState(false);

  if (min > max) {
    minControls.setNumber(max - 1);
  }
  if (max < min) {
    maxControls.setNumber(min + 1);
  }
  const [updateOn, setUpdateOn] = useState<"change" | "blur">("change");
  return (
    <Form>
      <Grid columns={1} desktopColumns={2} largeDesktopColumns={3}>
        <TextField {...minProps} label="Min" />
        <TextField {...maxProps} label="Max" />
        <TextField {...stepProps} label="Step" />
        <Select
          id="configurable-slider-update-on"
          label="Update On"
          value={updateOn}
          onChange={(value) => setUpdateOn(value === "change" ? value : "blur")}
          options={["change", "blur"]}
        />
        <Checkbox
          id="configurable-slider-before-addon"
          name="before"
          checked={before}
          onChange={(event) => setBefore(event.currentTarget.checked)}
          label="Before Addon?"
        />
        <Checkbox
          id="configurable-slider-after-addon"
          name="after"
          checked={after}
          onChange={(event) => setAfter(event.currentTarget.checked)}
          label="After Addon?"
        />
        <Checkbox
          id="configurable-slider-disabled"
          name="disabled"
          checked={disabled}
          onChange={(event) => setDisabled(event.currentTarget.checked)}
          label="Disabled?"
        />
        <GridCell desktop={{ colSpan: 2 }} largeDesktop={{ colSpan: 3 }}>
          <TextFieldWithMessage
            {...jumpProps}
            label="Jump"
            messageProps={{
              id: jumpProps.id,
              children: (
                <>
                  This is the distance the slider jumps when the{" "}
                  <Code>PageUp</Code> or <Code>PageDown</Code> keys are pressed.
                  Defaults to <Code>1/10th</Code> of the slider&apos;s range.
                </>
              ),
            }}
          />
        </GridCell>
      </Grid>
      <ConfiguredSlider
        min={min}
        max={max}
        step={step}
        jump={jump}
        updateOn={updateOn}
        disabled={disabled}
        before={before}
        after={after}
      />
    </Form>
  );
}
