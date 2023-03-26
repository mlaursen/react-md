import type { SliderProps } from "@react-md/core";
import {
  box,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Fieldset,
  Form,
  Legend,
  Link,
  Slider,
  Typography,
  useAppSize,
  useCSSVariables,
} from "@react-md/core";
import RefreshIcon from "@react-md/material-icons/RefreshIcon";
import { cnb } from "cnbuilder";
import type { ReactElement } from "react";
import { useMemo } from "react";

import {
  indexToMaterialGrade,
  indexToMaterialOpticalSize,
  indexToMaterialWeight,
  useMaterialIconsAndSymbols,
} from "./MaterialIconsAndSymbolsProvider";
import styles from "./MaterialSymbolCustomization.module.scss";

const width = 320 + 16;
const largerWidth = width + 16 * 3.5;

const SHARED_PROPS = {
  marks: true,
  discrete: true,
  tooltipVisibility: "hover",
  disableSmoothDragging: true,
} as const satisfies Partial<SliderProps>;

export function MaterialSymbolCustomization(): ReactElement {
  const {
    dispatch,
    setFill,
    setWeight,
    setGrade,
    setOpticalSize,
    symbolFill,
    symbolWeight,
    symbolGrade,
    symbolOpticalSize,
    isSymbolCustomizationChanged,
  } = useMaterialIconsAndSymbols();

  const { isLargeDesktop } = useAppSize();
  useCSSVariables(
    useMemo(
      () => [
        {
          name: "--customization-width",
          value: `${isLargeDesktop ? largerWidth : width}px`,
        },
      ],
      [isLargeDesktop]
    )
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle id="symbol-customization" type="headline-5">
          Customization
        </DialogTitle>
        <Button
          buttonType="icon"
          aria-label="Reset"
          disabled={!isSymbolCustomizationChanged}
          onClick={() => dispatch({ type: "resetSymbols" })}
        >
          <RefreshIcon />
        </Button>
      </DialogHeader>
      <DialogContent>
        <Form
          className={box({
            stacked: true,
            align: "stretch",
            disablePadding: true,
          })}
        >
          <Fieldset className={styles.fieldset}>
            <Legend>Fill</Legend>
            <Slider
              {...SHARED_PROPS}
              aria-label="Fill"
              min={0}
              max={1}
              value={symbolFill}
              setValue={setFill}
              getMarkLabelProps={({ value }) => ({
                children: value,
                className: cnb(
                  value === 0 && styles.firstLabel,
                  value === 1 && styles.lastLabel
                ),
              })}
            />
          </Fieldset>
          <Fieldset className={styles.fieldset}>
            <Legend>Weight</Legend>
            <Slider
              {...SHARED_PROPS}
              aria-label="Weight"
              min={0}
              max={6}
              value={symbolWeight}
              setValue={setWeight}
              getTooltipChildren={indexToMaterialWeight}
              getMarkLabelProps={({ value }) => {
                if (value !== 0 && value !== 6) {
                  return;
                }

                return {
                  children: indexToMaterialWeight(value),
                  className: cnb(
                    value === 0 && styles.firstLabel,
                    value === 6 && styles.lastLabel
                  ),
                };
              }}
            />
          </Fieldset>
          <Fieldset className={styles.fieldset}>
            <Legend>Grade</Legend>
            <Slider
              {...SHARED_PROPS}
              aria-label="Grade"
              min={0}
              max={2}
              value={symbolGrade}
              setValue={setGrade}
              getTooltipChildren={indexToMaterialGrade}
              getMarkLabelProps={({ value }) => {
                switch (value) {
                  case 0:
                    return {
                      children: "-25 (low)",
                      className: styles.firstLabel,
                    };
                  case 2:
                    return {
                      children: "200 (high emphasis)",
                      className: styles.lastLabel,
                      disableLineWrap: true,
                    };
                }
              }}
            />
          </Fieldset>
          <Fieldset className={styles.fieldset}>
            <Legend>Optical Size</Legend>
            <Slider
              {...SHARED_PROPS}
              aria-label="Optical Size"
              min={0}
              max={3}
              value={symbolOpticalSize}
              setValue={setOpticalSize}
              getTooltipChildren={indexToMaterialOpticalSize}
              getMarkLabelProps={({ value }) => {
                switch (value) {
                  case 0:
                    return {
                      children: "20px",
                      className: styles.firstLabel,
                    };
                  case 3:
                    return {
                      children: "48px",
                      className: styles.lastLabel,
                    };
                }
              }}
            />
          </Fieldset>
        </Form>
        <Typography type="body-2">
          Check out the{" "}
          <Link href="https://fonts.google.com/icons">
            official material symbols website
          </Link>{" "}
          for more information.
        </Typography>
      </DialogContent>
    </>
  );
}
