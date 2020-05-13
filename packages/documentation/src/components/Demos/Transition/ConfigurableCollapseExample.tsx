import React, { FC, useState } from "react";
import { Button } from "@react-md/button";
import { Card, CardContent, CardHeader, CardTitle } from "@react-md/card";
import { DialogFooter } from "@react-md/dialog";
import { Fieldset, Form, Select, TextField, FormMessage } from "@react-md/form";
import { Collapse } from "@react-md/transition";
import { Grid } from "@react-md/utils";

import useNumberInput from "hooks/useNumberInput";

import "./ConfigurableCollapseExample.scss";

const options = ["undefined", "true", "false"];

const ConfigurableCollapseExample: FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [
    minHeight,
    minHeightProps,
    minHeightError,
    resetMinHeight,
  ] = useNumberInput({
    min: 0,
    max: 200,
    defaultValue: 0,
  });
  const [
    minPaddingTop,
    minPaddingTopProps,
    minPaddingTopError,
    resetMinPaddingTop,
  ] = useNumberInput({
    min: 0,
    max: 80,
    defaultValue: 0,
  });
  const [
    minPaddingBottom,
    minPaddingBottomProps,
    minPaddingBottomError,
    resetMinPaddingBottom,
  ] = useNumberInput({
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
            <div>
              <TextField
                id="collapse-min-height"
                name="minHeight"
                label="Min Height"
                {...minHeightProps}
              />
              <FormMessage id="collapse-min-height-message" error>
                {minHeightError}
              </FormMessage>
            </div>
            <div>
              <TextField
                id="collapse-min-padding-top"
                name="minPaddingTop"
                label="Min Padding Top"
                {...minPaddingTopProps}
              />
              <FormMessage id="collapse-min-padding-top-message" error>
                {minPaddingTopError}
              </FormMessage>
            </div>
            <div>
              <TextField
                id="collapse-min-padding-bottom"
                name="minPaddingBottom"
                label="Min Padding Bottom"
                {...minPaddingBottomProps}
              />
              <FormMessage id="collapse-min-padding-bottom-message" error>
                {minPaddingBottomError}
              </FormMessage>
            </div>
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
            className="configurable-collapse-submit"
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
};

export default ConfigurableCollapseExample;
