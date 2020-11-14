import React, { ReactElement } from "react";
import {
  Checkbox,
  Fieldset,
  Form,
  ListboxOption,
  Select,
  TextArea,
} from "@react-md/form";
import { ListItemAddonPosition, ListItemAddonType } from "@react-md/list";
import { Text } from "@react-md/typography";
import { Grid } from "@react-md/utils";
import { upperFirst } from "lodash";

export type AddonType = ListItemAddonType | "none";

const ADDON_TYPES: readonly AddonType[] = [
  "none",
  "icon",
  "avatar",
  "media",
  "large-media",
];

const ADDON_TYPE_OPTIONS: ListboxOption[] = ADDON_TYPES.map((type) => ({
  name: type.split("-").map(upperFirst).join(" "),
  value: type,
}));

const isAddonType = (value: string): value is AddonType =>
  ADDON_TYPES.includes(value as AddonType);

const ADDON_POSITIONS: ListItemAddonPosition[] = ["top", "middle", "bottom"];

const isAddonPosition = (value: string): value is ListItemAddonPosition =>
  ADDON_POSITIONS.includes(value as ListItemAddonPosition);

export interface ConfigurationFormProps {
  disabled: boolean;
  setDisabled(v: boolean): void;
  disabledOpacity: boolean;
  setDisabledOpacity(v: boolean): void;
  primaryText: string;
  setPrimaryText(v: string): void;
  secondaryText: string;
  setSecondaryText(v: string): void;
  threeLines: boolean;
  setThreeLines(v: boolean): void;
  leftAddon: AddonType;
  setLeftAddon(v: AddonType): void;
  leftAddonPosition: ListItemAddonPosition;
  setLeftAddonPosition(v: ListItemAddonPosition): void;
  rightAddon: AddonType;
  setRightAddon(v: AddonType): void;
  rightAddonPosition: ListItemAddonPosition;
  setRightAddonPosition(v: ListItemAddonPosition): void;
}

export default function ConfigurationForm({
  disabled,
  setDisabled,
  disabledOpacity,
  setDisabledOpacity,
  primaryText,
  setPrimaryText,
  secondaryText,
  setSecondaryText,
  threeLines,
  setThreeLines,
  leftAddon,
  setLeftAddon,
  leftAddonPosition,
  setLeftAddonPosition,
  rightAddon,
  setRightAddon,
  rightAddonPosition,
  setRightAddonPosition,
}: ConfigurationFormProps): ReactElement {
  return (
    <Form>
      <Text type="headline-4">Customization</Text>
      <Fieldset legend="Disabled Behavior">
        <Checkbox
          id="configurable-disabled"
          name="disabled"
          label="Disabled"
          checked={disabled}
          onChange={(event) => setDisabled(event.currentTarget.checked)}
        />
        <Checkbox
          id="configurable-disabled-opacity"
          name="disabledOpacity"
          label="Disabled opacity"
          checked={disabledOpacity}
          onChange={(event) => setDisabledOpacity(event.currentTarget.checked)}
        />
      </Fieldset>
      <Fieldset legend="Text Behavior">
        <Grid columns={1}>
          <TextArea
            id="configurable-primary-text"
            name="primaryText"
            label="Primary Text"
            value={primaryText}
            onChange={(event) => setPrimaryText(event.currentTarget.value)}
          />
          <TextArea
            id="configurable-secondary-text"
            name="secondaryText"
            label="Secondary Text"
            value={secondaryText}
            onChange={(event) => setSecondaryText(event.currentTarget.value)}
          />
          <Checkbox
            id="configurable-three-lines"
            name="threeLines"
            label="Three Lines"
            checked={threeLines}
            onChange={(event) => setThreeLines(event.currentTarget.checked)}
          />
        </Grid>
      </Fieldset>
      <Fieldset legend="Left Addon Behavior">
        <Grid columns={2} phoneColumns={1}>
          <Select
            id="configurable-left-addon"
            name="leftAddon"
            label="Left Addon"
            labelKey="name"
            valueKey="value"
            value={leftAddon}
            onChange={(nextValue) => {
              if (isAddonType(nextValue)) {
                setLeftAddon(nextValue);
              }
            }}
            options={ADDON_TYPE_OPTIONS}
          />
          <Select
            id="configurable-left-addon-position"
            name="leftAddonPosition"
            label="Left Addon Position"
            value={leftAddonPosition}
            onChange={(nextValue) => {
              if (isAddonPosition(nextValue)) {
                setLeftAddonPosition(nextValue);
              }
            }}
            options={ADDON_POSITIONS}
          />
        </Grid>
      </Fieldset>
      <Fieldset legend="Right Addon Behavior">
        <Grid columns={2} phoneColumns={1}>
          <Select
            id="configurable-right-addon"
            name="rightAddon"
            label="Right Addon"
            labelKey="name"
            valueKey="value"
            value={rightAddon}
            onChange={(nextValue) => {
              if (isAddonType(nextValue)) {
                setRightAddon(nextValue);
              }
            }}
            options={ADDON_TYPE_OPTIONS}
          />
          <Select
            id="configurable-right-addon-position"
            name="rightAddonPosition"
            label="Right Addon Position"
            value={rightAddonPosition}
            onChange={(nextValue) => {
              if (isAddonPosition(nextValue)) {
                setRightAddonPosition(nextValue);
              }
            }}
            options={ADDON_POSITIONS}
          />
        </Grid>
      </Fieldset>
    </Form>
  );
}
