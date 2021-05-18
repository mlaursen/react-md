import React, { ReactElement, useState } from "react";
import { Button } from "@react-md/button";
import { Card, CardContent, CardHeader, CardTitle } from "@react-md/card";
import { DialogFooter } from "@react-md/dialog";
import {
  Fieldset,
  Form,
  Select,
  useNumberField,
  TextFieldWithMessage,
} from "@react-md/form";
import { Collapse } from "@react-md/transition";
import { Grid } from "@react-md/utils";

import styles from "./ConfigurableCollapseExample.module.scss";

const options = ["undefined", "true", "false"];

export default function ConfigurableCollapseExample(): ReactElement {
  const [collapsed, setCollapsed] = useState(true);
  const [minHeight, minHeightProps, { reset: resetMinHeight }] = useNumberField(
    {
      id: "collapse-min-height",
      min: 0,
      max: 200,
      defaultValue: 0,
    }
  );
  const [minPaddingTop, minPaddingTopProps, { reset: resetMinPaddingTop }] =
    useNumberField({
      id: "collapse-min-padding-top",
      min: 0,
      max: 80,
      defaultValue: 0,
    });
  const [
    minPaddingBottom,
    minPaddingBottomProps,
    { reset: resetMinPaddingBottom },
  ] = useNumberField({
    id: "collapse-min-padding-bottom",
    min: 0,
    max: 80,
    defaultValue: 0,
  });

  const [temporaryBehavior, setTemporary] = useState("undefined");

  let temporary: boolean | undefined;
  if (temporaryBehavior !== "undefined") {
    temporary = temporaryBehavior === "true";
  }

  return (
    <>
      <Form
        id="configurable-collapse-form"
        onReset={() => {
          resetMinHeight();
          resetMinPaddingTop();
          resetMinPaddingBottom();
          setTemporary("undefined");
          setCollapsed(true);
        }}
      >
        <Fieldset legend="Collapse Options">
          <Grid columns={1} desktopColumns={2} largeDesktopColumns={4}>
            <TextFieldWithMessage
              {...minHeightProps}
              name="minHeight"
              label="Min Height"
            />
            <TextFieldWithMessage
              {...minPaddingTopProps}
              name="minPaddingTop"
              label="Min Padding Top"
            />
            <TextFieldWithMessage
              {...minPaddingBottomProps}
              name="minPaddingBottom"
              label="Min Padding Bottom"
            />
            <Select
              id="collapse-temporary"
              label="Temporary behavior"
              options={options}
              name="temporary"
              value={temporaryBehavior}
              onChange={(nextValue) => setTemporary(nextValue)}
            />
          </Grid>
        </Fieldset>
        <DialogFooter>
          <Button
            theme="primary"
            themeType="contained"
            disabled={
              minHeightProps.error ||
              minPaddingTopProps.error ||
              minPaddingBottomProps.error
            }
            onClick={() => setCollapsed(!collapsed)}
            type="submit"
            className={styles.submit}
          >
            Toggle
          </Button>
          <Button type="reset" theme="secondary" themeType="contained">
            Reset
          </Button>
        </DialogFooter>
      </Form>
      <Collapse
        key={`${minHeight}-${minPaddingTop}-${minPaddingBottom}-${temporary}`}
        collapsed={collapsed}
        temporary={temporary}
        minHeight={minHeight}
        minPaddingTop={minPaddingTop}
        minPaddingBottom={minPaddingBottom}
      >
        <Card>
          <CardHeader>
            <CardTitle>Example</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Donec lacinia velit ac est finibus malesuada. Mauris arcu dui,
              euismod quis erat et, iaculis molestie orci. Nullam efficitur
              felis non feugiat tincidunt. Etiam sed tellus eu nunc fermentum
              vestibulum. Integer maximus iaculis fringilla. Donec tincidunt
              mauris quis iaculis volutpat. Ut tempor dui a nisl eleifend, non
              tempor ipsum condimentum. Morbi ultrices lectus a feugiat
              fringilla. Morbi ornare vehicula lorem, eu consectetur augue
              tristique sit amet. Vestibulum fringilla auctor eros, at
              consectetur libero hendrerit id. Interdum et malesuada fames ac
              ante ipsum primis in faucibus.
            </p>
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
}
