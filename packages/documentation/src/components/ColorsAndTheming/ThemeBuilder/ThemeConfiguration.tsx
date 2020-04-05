import React, { FC, useCallback, useEffect, useState } from "react";
import { Button } from "@react-md/button";
import { Checkbox, Form, Select } from "@react-md/form";
import { Text } from "@react-md/typography";
import {
  ContrastRatioCompliance,
  Grid,
  GridCell,
  HexString,
} from "@react-md/utils";

import {
  ColorAccent,
  primaries,
  PrimaryColor,
  secondaries,
  SecondaryColor,
  ThemeMode,
  useThemeActions,
} from "components/Theme";
import BackgroundWarnings from "./BackgroundWarnings";
import ConfigurationCell from "./ConfigurationCell";
import useThemeVariables from "./useThemeVariables";
import { getAccents, getOptionLabel, getOptions } from "./utils";

const baseSelectProps = {
  labelKey: "name",
  valueKey: "name",
  getOptionLabel,
  getDisplayLabel: getOptionLabel,
};

interface ThemeConfigurationProps {
  primary: PrimaryColor;
  secondary: SecondaryColor;
  accent: ColorAccent;
  theme: ThemeMode;
  primaryColor: HexString;
  secondaryColor: HexString;
}

const compliances = [
  {
    name: "large",
    label: "large (3:1)",
  },
  {
    name: "normal",
    label: "normal (4.5:1)",
  },
  {
    name: "AAA",
    label: "AAA (7:1)",
  },
];

const ThemeConfiguration: FC<ThemeConfigurationProps> = ({
  primary,
  secondary,
  accent,
  theme,
  primaryColor,
  secondaryColor,
}) => {
  const {
    setPrimary,
    setSecondary,
    setAccent,
    toggleTheme,
    reset,
  } = useThemeActions();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => reset(), []);
  const variables = useThemeVariables(primaryColor, secondaryColor);
  const [compliance, setCompliance] = useState<ContrastRatioCompliance>(
    "large"
  );
  const handleComplianceChange = useCallback(
    (compliance: string) =>
      setCompliance(compliance as ContrastRatioCompliance),
    []
  );

  const resetAll = useCallback(() => {
    reset();
    setCompliance("large");
  }, [reset]);

  useEffect(() => {
    const { style } = document.documentElement;
    variables.forEach((variable) => {
      style.setProperty(variable.name, `${variable.value}`);
    });

    return () => {
      variables.forEach((variable) => {
        style.setProperty(variable.name, "");
      });
    };
  }, [variables]);

  return (
    <GridCell clone>
      <Form>
        <Grid columns={1} tabletColumns={2} largeDesktopColumns={3}>
          <ConfigurationCell fullWidth>
            <Text type="headline-4" margin="bottom">
              Configuration
            </Text>
          </ConfigurationCell>
          <ConfigurationCell>
            <Select
              {...baseSelectProps}
              id="primary-color"
              label="Primary color"
              value={primary}
              onChange={setPrimary}
              options={getOptions(primaries, secondary, true)}
            />
          </ConfigurationCell>
          <ConfigurationCell>
            <Select
              {...baseSelectProps}
              id="secondary-color"
              label="Secondary color"
              value={secondary}
              onChange={setSecondary}
              options={getOptions(secondaries, primary, false)}
            />
          </ConfigurationCell>
          <ConfigurationCell>
            <Select
              {...baseSelectProps}
              id="accent-hue"
              label="Accent hue"
              value={`${accent}`}
              onChange={setAccent}
              options={getAccents(secondary)}
            />
          </ConfigurationCell>
          <ConfigurationCell>
            <Select
              {...baseSelectProps}
              id="wcag-compliance-level"
              label="Compliance Level"
              value={compliance}
              onChange={handleComplianceChange}
              options={compliances}
            />
          </ConfigurationCell>
          <ConfigurationCell fullWidth>
            <Checkbox
              id="toggle-theme-checkbox"
              label="Enable dark theme"
              name="theme"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />
          </ConfigurationCell>
          <ConfigurationCell fullWidth>
            <BackgroundWarnings
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              isDark={theme === "dark"}
              compliance={compliance}
            />
          </ConfigurationCell>
        </Grid>
        <Button
          type="submit"
          theme="secondary"
          onClick={resetAll}
          themeType="contained"
        >
          Reset
        </Button>
      </Form>
    </GridCell>
  );
};

export default ThemeConfiguration;
