import {
  Box,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Divider,
  Form,
  Option,
  Select,
} from "@react-md/core";
import type { ReactElement } from "react";
import type { PrismTheme } from "../Code";
import { PRISM_THEMES, useCodeConfig } from "../Code";
import { ColorSchemeButtons } from "./ColorSchemeButtons";
import { WritingDirectionButtons } from "./WritingDirectionButtons";

export function WebsiteConfiguration(): ReactElement {
  const { theme, setTheme } = useCodeConfig();
  return (
    <>
      <DialogHeader>
        <DialogTitle type="headline-5">Configuration</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <Form>
          <Box disablePadding align="start" stacked>
            <WritingDirectionButtons />
            <Divider />
            <ColorSchemeButtons />
            <Divider />
            <Select
              label="Code Theme"
              name="theme"
              value={theme}
              stretch
              onChange={(event) =>
                setTheme(event.currentTarget.value as PrismTheme)
              }
            >
              {PRISM_THEMES.map((theme) => (
                <Option key={theme} value={theme}>
                  {theme}
                </Option>
              ))}
            </Select>
          </Box>
        </Form>
      </DialogContent>
    </>
  );
}
