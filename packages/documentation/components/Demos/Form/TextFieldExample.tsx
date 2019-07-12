import React, { FC } from "react";
import { Divider } from "@react-md/divider";
import {
  TextField,
  TextFieldTheme,
  Form,
  useRadioState,
  Fieldset,
  Radio,
  useCheckboxState,
  Checkbox,
} from "@react-md/form";
import { FavoriteSVGIcon, LocationOnSVGIcon } from "@react-md/material-icons";

import "./TextFieldExample.scss";

const themes: TextFieldTheme[] = ["none", "underline", "filled", "outline"];

const TextFieldExample: FC = () => {
  const [useLeft, handleLeftChange, setLeftIcon] = useCheckboxState(false);
  const [useRight, handleRightChange, setRightIcon] = useCheckboxState(false);
  const [dense, handleDenseChange] = useCheckboxState(false);
  const [label, handleLabelChange, setLabel] = useCheckboxState(true);
  const [currentTheme, handleThemeChange] = useRadioState<TextFieldTheme>(
    "outline",
    event => {
      // the "unstyled" state does not support icons and a label out of the box
      // and requires additional styling instead
      if (event.currentTarget.value === "none") {
        setLeftIcon(false);
        setRightIcon(false);
        setLabel(false);
      } else if (!label) {
        setLabel(true);
      }
    }
  );
  const isUnstyled = currentTheme === "none";

  return (
    <Form className="simple-text-fields">
      <Fieldset legend="Text field theme" disableLegendSROnly>
        {themes.map(theme => (
          <Radio
            id={`text-theme-${theme}`}
            key={theme}
            name="theme"
            onChange={handleThemeChange}
            value={theme}
            checked={currentTheme === theme}
            label={theme}
          />
        ))}
      </Fieldset>
      <Fieldset legend="Text field options" disableLegendSROnly>
        <Checkbox
          id="text-field-left-icon"
          name="leftIcon"
          label="Use left icon"
          disabled={isUnstyled}
          checked={useLeft}
          onChange={handleLeftChange}
        />
        <Checkbox
          id="text-field-right-icon"
          name="rightIcon"
          label="Use right icon"
          disabled={isUnstyled}
          checked={useRight}
          onChange={handleRightChange}
        />
        <Checkbox
          id="text-field-dense"
          name="dense"
          label="Use dense spec"
          checked={dense}
          onChange={handleDenseChange}
        />
        <Checkbox
          id="text-field-label"
          name="label"
          label="Use label"
          disabled={isUnstyled}
          checked={label}
          onChange={handleLabelChange}
        />
      </Fieldset>
      <Divider />
      <TextField
        id="configurable-text-field"
        label={label && "Label"}
        placeholder="Placeholder"
        dense={dense}
        theme={currentTheme}
        leftChildren={useLeft && <FavoriteSVGIcon />}
        rightChildren={useRight && <LocationOnSVGIcon />}
      />
    </Form>
  );
};

export default TextFieldExample;
