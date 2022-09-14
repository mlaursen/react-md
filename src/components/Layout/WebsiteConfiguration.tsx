import { Button } from "@react-md/button";
import { Box, useColorScheme, useDir } from "@react-md/core";
import { DialogContent, DialogHeader, DialogTitle } from "@react-md/dialog";
import { Form, Label } from "@react-md/form";
import type { ReactElement } from "react";
import type { PrismTheme } from "../Code";
import { PRISM_THEMES, useCodeConfig } from "../Code";

export function WebsiteConfiguration(): ReactElement {
  const { dir, toggleDir } = useDir();
  const { theme, setTheme } = useCodeConfig();
  const { colorSchemeMode, setColorSchemeMode } = useColorScheme();
  return (
    <>
      <DialogHeader>
        <DialogTitle type="headline-5">Configuration</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Form>
          <Box disablePadding align="start" stacked>
            <Button
              aria-pressed={dir === "rtl"}
              onClick={toggleDir}
              themeType="outline"
            >
              {dir}
            </Button>
            <Button
              themeType="outline"
              onClick={() => {
                setColorSchemeMode((mode) => {
                  if (mode === "dark") {
                    return "system";
                  }
                  if (mode === "system") {
                    return "light";
                  }

                  return "dark";
                });
              }}
            >
              {colorSchemeMode}
            </Button>
            <Label stacked style={{ alignItems: "flex-start" }}>
              Code Theme
              <select
                name="theme"
                value={theme}
                onChange={(event) =>
                  setTheme(event.currentTarget.value as PrismTheme)
                }
              >
                {PRISM_THEMES.map((theme) => (
                  <option key={theme}>{theme}</option>
                ))}
              </select>
            </Label>
          </Box>
        </Form>
      </DialogContent>
    </>
  );
}
