import React, { FC, useState } from "react";
import {
  Checkbox,
  Fieldset,
  NativeSelect,
  TextArea,
  TextAreaResize,
  useCheckboxState,
  useChoice,
} from "@react-md/form";

import TextFieldThemeConfig from "./TextFieldThemeConfig";

const MAX_ROWS = [-1, 4, 5, 6, 7, 8, 9, 10];

const TextAreaExample: FC = () => {
  const [resize, handleResizeChange] = useChoice<TextAreaResize>("auto");
  const [animate, handleAnimateChange] = useCheckboxState(true);
  const [maxRows, handleMaxRowChange] = useChoice("-1");

  return (
    <TextFieldThemeConfig
      idPrefix="textarea"
      renderField={props => (
        <TextArea
          id="configurable-textarea"
          {...props}
          maxRows={parseInt(maxRows, 10)}
          resize={resize}
          animate={animate}
        />
      )}
    >
      <Fieldset legend="Textarea options" disableLegendSROnly>
        <Checkbox
          id="textarea-animate"
          checked={animate}
          onChange={handleAnimateChange}
          name="animate"
          label="Animate height"
          disabled={resize !== "auto"}
        />
        <NativeSelect
          id="textarea-resize"
          label="Resize"
          name="resize"
          value={resize}
          onChange={handleResizeChange}
          className="text-field-theme-config__select"
        >
          <option value="none">None</option>
          <option value="auto">Auto</option>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
          <option value="both">Both</option>
        </NativeSelect>
        <NativeSelect
          id="textarea-max-rows"
          label="Max rows"
          name="maxRows"
          value={maxRows}
          onChange={handleMaxRowChange}
          className="text-field-theme-config__select"
        >
          {MAX_ROWS.map(amount => (
            <option key={amount} value={amount}>
              {amount}
            </option>
          ))}
        </NativeSelect>
      </Fieldset>
    </TextFieldThemeConfig>
  );
};

export default TextAreaExample;
