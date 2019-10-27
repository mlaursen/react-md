import React, { FC, Fragment } from "react";
import {
  NativeSelect,
  useCheckboxState,
  Fieldset,
  TextField,
  useChoice,
} from "@react-md/form";

import states from "constants/states";
import Checkbox from "components/Checkbox";

import TextFieldThemeConfig from "./TextFieldThemeConfig";

interface State {
  name: string;
  abbreviation: string;
}

const grouped = states.reduce<Record<string, State[]>>((collection, state) => {
  const firstLetter = state.name.substring(0, 1).toUpperCase();
  if (!collection[firstLetter]) {
    collection[firstLetter] = [];
  }

  collection[firstLetter].push(state);
  return collection;
}, {});

const States: FC<{ states: readonly State[]; readOnly?: boolean }> = ({
  states,
  readOnly,
}) => (
  <Fragment>
    {states.map(({ name, abbreviation }) => (
      <option key={abbreviation} value={abbreviation} disabled={readOnly}>
        {name}
      </option>
    ))}
  </Fragment>
);

const NativeSelectExample: FC = () => {
  const [icon, handleIconChange, setIcon] = useCheckboxState(true);
  const [size, handleSizeChange] = useChoice("4");
  const [multiple, handleMultipleChange] = useCheckboxState(false);
  const [optgroup, handleOptgroupChange] = useCheckboxState(false);
  if (multiple && icon) {
    setIcon(false);
  }

  return (
    <TextFieldThemeConfig
      idPrefix="native-select"
      disableDense={multiple}
      disableRightIcon={!multiple}
      renderField={({
        label,
        placeholder: _placeholder,
        readOnly,
        ...props
      }) => (
        <NativeSelect
          id="configurable-native-select"
          {...props}
          key={`${optgroup}-${multiple}`}
          label={label}
          icon={icon ? undefined : null}
          size={multiple ? parseInt(size, 10) : undefined}
          defaultValue={multiple ? [""] : ""}
          multiple={multiple}
        >
          {label && <option key="label" value="" disabled hidden />}
          {!optgroup && <States states={states} readOnly={readOnly} />}
          {optgroup &&
            Object.entries(grouped).map(([letter, states]) => (
              <optgroup key={letter} label={letter}>
                <States states={states} readOnly={readOnly} />
              </optgroup>
            ))}
        </NativeSelect>
      )}
    >
      <Fieldset legend="Select options" disableLegendSROnly>
        <Checkbox
          id="native-select-optgroup"
          name="optgroup"
          checked={optgroup}
          onChange={handleOptgroupChange}
          label="Use optgroup"
        />
        <Checkbox
          id="native-select-icon"
          name="icon"
          checked={icon}
          disabled={multiple}
          onChange={handleIconChange}
          label="Use dropdown icon"
        />
        <Checkbox
          id="native-select-multiple"
          name="multiple"
          checked={multiple}
          onChange={handleMultipleChange}
          label="Multi-select"
        />
        <TextField
          id="native-select-size"
          type="number"
          name="size"
          value={size}
          min="1"
          style={{ marginTop: "1rem" }}
          onChange={handleSizeChange}
          disabled={!multiple}
          label="Multi-select size"
        />
      </Fieldset>
    </TextFieldThemeConfig>
  );
};

export default NativeSelectExample;
