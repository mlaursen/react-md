import React, { FC, Fragment } from "react";
import { AppBar, AppBarAction } from "@react-md/app-bar";
import { Checkbox, Radio, InputToggle } from "@react-md/form";
import { Text } from "@react-md/typography";
import {
  CheckBoxSVGIcon,
  RadioButtonCheckedSVGIcon,
} from "@react-md/material-icons";

const CheckboxAndRadioExamples: FC = () => (
  <Fragment>
    <Checkbox
      id="checkbox-1"
      name="checkboxes"
      label="Checkbox 1"
      defaultChecked
    />
    <Checkbox id="checkbox-2" name="checkboxes" label="Checkbox 2" />
    <InputToggle
      id="checkbox-3"
      name="checkboxes"
      type="checkbox"
      icon={<CheckBoxSVGIcon />}
      label="Checkbox 3"
    />
    <Radio id="radio-1" name="radios" label="Radio 1" />
    <Radio id="radio-2" name="radios" label="Radio 2" />
    <InputToggle
      id="radio-3"
      type="radio"
      name="radios"
      label="Radio 3"
      icon={<RadioButtonCheckedSVGIcon />}
    />
    <form onSubmit={event => event.preventDefault()}>
      <Text type="headline-5">Example Form</Text>
      {Array.from(new Array(5), (_, i) => (
        <Checkbox
          key={i}
          id={`example-form-checkbox-${i}`}
          name="example-form-checkboxes"
          label={`Checkbox ${i + 1}`}
          defaultChecked={i % 4 === 0}
          icon={<CheckBoxSVGIcon />}
        />
      ))}
      {Array.from(new Array(3), (_, i) => (
        <Radio
          key={i}
          id={`example-form-radios-${i}`}
          name="example-form-radios"
          label={`Radio ${i + 1}`}
          inline
          icon={<RadioButtonCheckedSVGIcon />}
        />
      ))}
      <AppBar component="footer" theme="clear">
        <AppBarAction
          id="reset-form-1"
          first
          type="reset"
          theme="warning"
          buttonType="text"
        >
          Reset
        </AppBarAction>
        <AppBarAction
          id="submit-form-1"
          type="submit"
          theme="primary"
          buttonType="text"
        >
          Submit
        </AppBarAction>
      </AppBar>
    </form>
  </Fragment>
);

export default CheckboxAndRadioExamples;
