import {
  Box,
  Divider,
  Fieldset,
  Legend,
  Link,
  Slider,
  Switch,
  Typography,
  type SliderProps,
} from "react-md";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./FilterSymbolCustomization.module.scss";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import {
  indexToMaterialGrade,
  indexToMaterialOpticalSize,
  indexToMaterialWeight,
} from "./constants.js";

const SHARED_PROPS = {
  marks: true,
  discrete: true,
  tooltipVisibility: "hover",
  disableSmoothDragging: true,
} as const satisfies Partial<SliderProps>;

export function FilterSymbolCustomization(): ReactElement {
  const {
    setFill,
    setWeight,
    setGrade,
    setOpticalSize,
    symbolFill,
    symbolWeight,
    symbolGrade,
    symbolOpticalSize,
  } = useMaterialIconsAndSymbols();
  return (
    <>
      <Box stacked align="stretch">
        <Switch
          label="Fill"
          checked={symbolFill === 1}
          onChange={() => setFill(symbolFill === 1 ? 0 : 1)}
        />
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
                    textOverflow: "nowrap",
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
        <Typography type="body-2">
          Check out the{" "}
          <Link href="https://fonts.google.com/icons">
            official material symbols website
          </Link>{" "}
          for more information.
        </Typography>
      </Box>
      <Divider />
    </>
  );
}
