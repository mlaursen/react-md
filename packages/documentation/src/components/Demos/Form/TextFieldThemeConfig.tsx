import React, { FC, ReactNode } from "react";
import {
  Checkbox,
  Fieldset,
  Form,
  Radio,
  TextFieldProps,
  FormTheme,
  FormThemeProvider,
  FormUnderlineDirection,
  useChecked,
  useChoice,
  Select,
  useSelectState,
} from "@react-md/form";
import { FavoriteSVGIcon, LocationOnSVGIcon } from "@react-md/material-icons";

import styles from "./TextFieldThemeConfig.module.scss";

const themes: FormTheme[] = ["none", "underline", "filled", "outline"];

type Config = Pick<
  TextFieldProps,
  | "leftChildren"
  | "rightChildren"
  | "dense"
  | "label"
  | "error"
  | "inline"
  | "placeholder"
  | "readOnly"
  | "disabled"
>;

export interface TextFieldThemeProps {
  idPrefix: string;
  renderField: (config: Config) => ReactNode;
  children?: ReactNode;
  disableDense?: boolean;
  disableRightIcon?: boolean;
}

/**
 * This is a small higher-order-component that will provide the themeable props
 * to either a `TextField` or `TextArea` for the two configurable examples.
 */
const TextFieldThemeConfig: FC<TextFieldThemeProps> = ({
  idPrefix,
  children,
  renderField,
  disableDense,
  disableRightIcon,
}) => {
  const [useLeft, handleLeftChange, setLeftIcon] = useChecked(false);
  const [useRight, handleRightChange, setRightIcon] = useChecked(false);
  const [dense, handleDenseChange, setDense] = useChecked(false);
  const [label, handleLabelChange, setLabel] = useChecked(true);
  const [inline, handleInlineChange] = useChecked(false);
  const [readOnly, handleReadOnlyChange, setReadOnly] = useChecked(false);
  const [error, handleErrorChange, setError] = useChecked(false);
  const [disabled, handleDisabledChange] = useChecked(false);
  const [underlineDirection, setUnderlineDirection] = useSelectState<
    FormUnderlineDirection
  >("left");
  const [currentTheme, handleThemeChange] = useChoice<FormTheme>(
    "outline",
    (event) => {
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
  if (disabled && error) {
    setError(false);
  }

  if (disabled && readOnly) {
    setReadOnly(false);
  }

  if (disableDense && dense) {
    setDense(false);
  }

  if (disableRightIcon && useRight) {
    setRightIcon(false);
  }

  return (
    <Form className={styles.container}>
      <Fieldset legend="Text field theme">
        {themes.map((theme, i) => (
          <Radio
            id={`${idPrefix}-theme-${i}`}
            key={theme}
            name="theme"
            onChange={handleThemeChange}
            value={theme}
            checked={currentTheme === theme}
            label={theme}
          />
        ))}
      </Fieldset>
      <Fieldset legend="Text field options">
        <Checkbox
          id={`${idPrefix}-left-icon`}
          name="leftIcon"
          label="Use left icon"
          disabled={isUnstyled}
          checked={useLeft}
          onChange={handleLeftChange}
        />
        <Checkbox
          id={`${idPrefix}-right-icon`}
          name="rightIcon"
          label="Use right icon"
          disabled={isUnstyled || disableRightIcon}
          checked={useRight}
          onChange={handleRightChange}
        />
        <Checkbox
          id={`${idPrefix}-dense`}
          name="dense"
          label="Use dense spec"
          checked={dense}
          disabled={disableDense}
          onChange={handleDenseChange}
        />
        <Checkbox
          id={`${idPrefix}-inline`}
          name="inline"
          label="Display inline"
          checked={inline}
          onChange={handleInlineChange}
        />
        <Checkbox
          id={`${idPrefix}-label`}
          name="label"
          label="Use label"
          disabled={isUnstyled}
          checked={label}
          onChange={handleLabelChange}
        />
        <Checkbox
          id={`${idPrefix}-read-only`}
          name="readOnly"
          label="Read Only"
          checked={readOnly}
          disabled={disabled}
          onChange={handleReadOnlyChange}
        />
        <Checkbox
          id={`${idPrefix}-disabled`}
          name="disabled"
          label="Disabled"
          checked={disabled}
          onChange={handleDisabledChange}
        />
        <Checkbox
          id={`${idPrefix}-error`}
          name="error"
          label="Error"
          disabled={disabled}
          checked={error}
          onChange={handleErrorChange}
        />
      </Fieldset>
      <Select
        id={`${idPrefix}-underline-direction`}
        label="Underline Direction"
        name="underlineDirection"
        value={underlineDirection}
        onChange={setUnderlineDirection}
        options={["left", "center", "right"]}
        disabled={currentTheme !== "underline" && currentTheme !== "filled"}
        className={styles.select}
      />
      {children}
      <div className={styles.demo}>
        <FormThemeProvider
          theme={currentTheme}
          underlineDirection={underlineDirection}
        >
          {renderField({
            label: label && "Label",
            placeholder: "Placeholder",
            dense,
            inline,
            readOnly,
            disabled,
            error,
            leftChildren: useLeft && <FavoriteSVGIcon />,
            rightChildren: useRight && <LocationOnSVGIcon />,
          })}
        </FormThemeProvider>
      </div>
    </Form>
  );
};

export default TextFieldThemeConfig;
