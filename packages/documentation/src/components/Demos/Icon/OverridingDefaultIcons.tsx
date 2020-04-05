import React, { FC, useState } from "react";
import { Checkbox, Select } from "@react-md/form";
import {
  ConfigurableIcons,
  IconProvider,
  TextIconSpacing,
  useIcon,
} from "@react-md/icon";
import {
  ArrowDropDownSVGIcon,
  CheckBoxSVGIcon,
  ArrowDropDownFontIcon,
} from "@react-md/material-icons";
import { Text } from "@react-md/typography";
import { Grid } from "@react-md/utils";

// Note: If you want to enforce all icons should be updated, you can
// switch to the `ConfiguredIcons` interface which is really just a
// simple wrapper of `Required<ConfigurableIcons>`
const overrides: ConfigurableIcons = {
  checkbox: <CheckBoxSVGIcon />,
  dropdown: <ArrowDropDownSVGIcon />,
};

const PulledFromContext: FC = () => {
  const icon = useIcon("dropdown");

  // I'm cheating a little bit for this demo, you probably shouldn't reference
  // the `rmd-text-icon-spacing` class name as it might be removed at some point
  return (
    <div className="rmd-text-icon-spacing">
      <TextIconSpacing icon={icon} iconAfter>
        <Text>Dropdown Icon</Text>
      </TextIconSpacing>
    </div>
  );
};

const OverridingDefaultIcons: FC = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  return (
    <IconProvider {...overrides}>
      <Grid clone columns={1} desktopColumns={2}>
        <Select
          id="select-1"
          label="Inherits"
          placeholder="Item..."
          options={Array.from(new Array(10), (_, i) => `Item ${i + 1}`)}
          value={value1}
          onChange={(value) => setValue1(value)}
        />
        <Select
          id="select-2"
          label="Prop Overrides"
          placeholder="Item..."
          options={Array.from(new Array(10), (_, i) => `Item ${i + 1}`)}
          value={value2}
          onChange={(value) => setValue2(value)}
          rightChildren={<ArrowDropDownFontIcon />}
        />
        <Checkbox id="checkbox-1" name="checkbox" label="Checkbox inherits" />
        <PulledFromContext />
      </Grid>
    </IconProvider>
  );
};

export default OverridingDefaultIcons;
