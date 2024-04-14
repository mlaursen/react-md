"use client";
import { box } from "@react-md/core/box/styles";
import { Divider } from "@react-md/core/divider/Divider";
import { Fieldset } from "@react-md/core/form/Fieldset";
import { Form } from "@react-md/core/form/Form";
import { Legend } from "@react-md/core/form/Legend";
import { Slider } from "@react-md/core/form/Slider";
import { useRangeSlider } from "@react-md/core/form/useRangeSlider";
import { useSlider } from "@react-md/core/form/useSlider";
import { Typography } from "@react-md/core/typography/Typography";
import { useId, type ReactElement } from "react";

export default function DiscreteSlider(): ReactElement {
  const legendId1 = useId();
  const legendId2 = useId();
  const legendId3 = useId();
  const legendId4 = useId();
  const legendId5 = useId();
  const legendId6 = useId();

  const slider = useSlider({ defaultValue: 30 });
  const rangeSlider = useRangeSlider({ defaultValue: [30, 50] });

  return (
    <Form className={box({ fullWidth: true })}>
      <Typography type="headline-5" margin="none">
        Slider
      </Typography>
      <Fieldset fullWidth>
        <Legend id={legendId1}>Auto</Legend>
        <Slider
          aria-labelledby={legendId1}
          {...slider}
          discrete
          tooltipVisibility="auto"
        />
      </Fieldset>
      <Fieldset fullWidth>
        <Legend id={legendId2}>Hover</Legend>
        <Slider
          aria-labelledby={legendId2}
          {...slider}
          discrete
          tooltipVisibility="hover"
        />
      </Fieldset>
      <Fieldset fullWidth>
        <Legend id={legendId3}>Always</Legend>
        <Slider
          aria-labelledby={legendId3}
          {...slider}
          discrete
          tooltipVisibility="always"
        />
      </Fieldset>
      <Divider />
      <Typography type="headline-5" margin="none">
        Range Slider
      </Typography>
      <Fieldset fullWidth>
        <Legend id={legendId4}>Auto</Legend>
        <Slider
          aria-labelledby={legendId4}
          {...rangeSlider}
          discrete
          tooltipVisibility="auto"
        />
      </Fieldset>
      <Fieldset fullWidth>
        <Legend id={legendId5}>Hover</Legend>
        <Slider
          aria-labelledby={legendId5}
          {...rangeSlider}
          discrete
          tooltipVisibility="hover"
        />
      </Fieldset>
      <Fieldset fullWidth>
        <Legend id={legendId6}>Always</Legend>
        <Slider
          aria-labelledby={legendId6}
          {...rangeSlider}
          discrete
          tooltipVisibility="always"
        />
      </Fieldset>
    </Form>
  );
}
