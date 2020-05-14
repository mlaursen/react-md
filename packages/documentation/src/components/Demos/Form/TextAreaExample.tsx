import React, { FC } from "react";
import {
  Checkbox,
  Fieldset,
  NativeSelect,
  TextArea,
  TextAreaResize,
  useChecked,
  useChoice,
} from "@react-md/form";

import TextFieldThemeConfig from "./TextFieldThemeConfig";
import styles from "./TextAreaExample.module.scss";

const MAX_ROWS = [-1, 4, 5, 6, 7, 8, 9, 10];

const TextAreaExample: FC = () => {
  const [resize, handleResizeChange] = useChoice<TextAreaResize>("auto");
  const [animate, handleAnimateChange] = useChecked(true);
  const [rows, handleRowChange] = useChoice("2");
  const [maxRows, handleMaxRowChange, setMaxRows] = useChoice<string>("-1");
  const rowsInt = parseInt(rows, 10);
  const maxRowsInt = parseInt(maxRows, 10);
  if (maxRowsInt !== -1 && maxRowsInt < rowsInt) {
    const i = MAX_ROWS.find((value) => value >= rowsInt) || -1;
    setMaxRows(`${i}`);
  }

  return (
    <TextFieldThemeConfig
      idPrefix="textarea"
      renderField={(props) => (
        <TextArea
          id="configurable-textarea"
          {...props}
          key={`${rows}-${resize}`}
          rows={rowsInt}
          maxRows={maxRowsInt}
          resize={resize}
          animate={animate}
        />
      )}
    >
      <Fieldset legend="Textarea options">
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
          className={styles.select}
        >
          <option value="none">None</option>
          <option value="auto">Auto</option>
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
          <option value="both">Both</option>
        </NativeSelect>
        <NativeSelect
          id="textarea-rows"
          label="Starting Rows"
          name="rows"
          value={rows}
          onChange={handleRowChange}
          className={styles.select}
        >
          {Array.from(new Array(6), (_, i) => (
            <option key={i} value={i + 2}>
              {i + 2}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect
          id="textarea-max-rows"
          label="Max rows"
          name="maxRows"
          value={maxRows}
          onChange={handleMaxRowChange}
          className={styles.select}
        >
          {MAX_ROWS.map((amount) => (
            <option
              key={amount}
              value={amount}
              disabled={amount !== -1 && amount < rowsInt}
            >
              {amount}
            </option>
          ))}
        </NativeSelect>
      </Fieldset>
    </TextFieldThemeConfig>
  );
};

export default TextAreaExample;
