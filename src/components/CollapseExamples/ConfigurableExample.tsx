import { Button } from "@react-md/button";
import { Card, CardContent, CardHeader, CardTitle } from "@react-md/card";
import { Box, useCollapseTransition, useToggle } from "@react-md/core";
import {
  Fieldset,
  Form,
  Legend,
  NativeSelect,
  TextField,
  useNumberField,
} from "@react-md/form";
import type { ReactElement } from "react";
import { useState } from "react";

const options = ["undefined", "true", "false"] as const;

type TemporaryBehavior = (typeof options)[number];

export function ConfigurableExample(): ReactElement {
  const {
    value: minHeight,
    fieldProps: minHeightProps,
    reset: resetMinHeight,
  } = useNumberField({
    min: 0,
    max: 200,
    name: "minHeight",
    defaultValue: 0,
  });
  const {
    value: minPaddingTop,
    fieldProps: minPaddingTopProps,
    reset: resetMinPaddingTop,
  } = useNumberField({
    min: 0,
    max: 80,
    name: "minPaddingTop",
    defaultValue: 0,
  });
  const {
    value: minPaddingBottom,
    fieldProps: minPaddingBottomProps,
    reset: resetMinPaddingBottom,
  } = useNumberField({
    min: 0,
    max: 80,
    name: "minPaddingBottom",
    defaultValue: 0,
  });
  const [temporary, setTemporary] = useState<TemporaryBehavior>("undefined");

  const { toggled, toggle, setToggled } = useToggle(false);
  const { elementProps, rendered } = useCollapseTransition({
    transitionIn: toggled,
    minHeight,
    minPaddingBottom,
    minPaddingTop,
    temporary: temporary === "undefined" ? undefined : temporary === "true",
  });

  return (
    <>
      <Form
        style={{ width: "100%", maxWidth: "40rem" }}
        onSubmit={toggle}
        onReset={() => {
          resetMinHeight();
          resetMinPaddingTop();
          resetMinPaddingBottom();
          setToggled(false);
          setTemporary("undefined");
        }}
      >
        <Fieldset>
          <Legend>Collapse Options</Legend>
          <Box grid align="start">
            <TextField {...minHeightProps} label="Min height" />
            <TextField {...minPaddingTopProps} label="Min padding top" />
            <TextField {...minPaddingBottomProps} label="Min padding bottom" />
            <NativeSelect
              label="Temporary"
              name="temporary"
              value={temporary}
              onChange={(event) =>
                setTemporary(event.currentTarget.value as TemporaryBehavior)
              }
            >
              {options.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </NativeSelect>
          </Box>
        </Fieldset>
        <Box justify="end">
          <Button
            type="submit"
            theme="primary"
            themeType="contained"
            disabled={
              minHeightProps.error ||
              minPaddingTopProps.error ||
              minPaddingBottomProps.error
            }
          >
            Toggle
          </Button>
          <Button type="reset" theme="secondary" themeType="contained">
            Reset
          </Button>
        </Box>
        <div style={{ minHeight: "40rem" }}>
          {rendered && (
            <Card {...elementProps}>
              <CardHeader>
                <CardTitle>Example</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Donec lacinia velit ac est finibus malesuada. Mauris arcu dui,
                  euismod quis erat et, iaculis molestie orci. Nullam efficitur
                  felis non feugiat tincidunt. Etiam sed tellus eu nunc
                  fermentum vestibulum. Integer maximus iaculis fringilla. Donec
                  tincidunt mauris quis iaculis volutpat. Ut tempor dui a nisl
                  eleifend, non tempor ipsum condimentum. Morbi ultrices lectus
                  a feugiat fringilla. Morbi ornare vehicula lorem, eu
                  consectetur augue tristique sit amet. Vestibulum fringilla
                  auctor eros, at consectetur libero hendrerit id. Interdum et
                  malesuada fames ac ante ipsum primis in faucibus.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </Form>
    </>
  );
}
