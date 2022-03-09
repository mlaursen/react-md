import { Button } from "@react-md/button";
import { Card, CardContent, CardHeader, CardTitle } from "@react-md/card";
import {
  Checkbox,
  Form,
  TextFieldWithMessage,
  useNumberField,
} from "@react-md/form";
import { DEFAULT_TOOLTIP_DELAY } from "@react-md/tooltip";
import {
  DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
  DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
  Grid,
  GridCell,
  HoverModeProvider,
} from "@react-md/utils";
import type { ReactElement } from "react";
import { useState } from "react";
import styles from "./ConfigurableTooltip.module.scss";
import TooltippedButton from "./TooltippedButton";

export default function ConfigurableTooltip(): ReactElement {
  const [
    defaultVisibleInTime,
    defaultVisibleInTimeProps,
    { reset: resetDefaultVisibleInTime },
  ] = useNumberField({
    id: "tooltip-visible-in-time",
    min: 0,
    step: 100,
    defaultValue: DEFAULT_HOVER_MODE_VISIBLE_IN_TIME,
    helpText: (
      <>
        The amount of time (in ms) before the tooltip should become visible. If
        the hover mode is enabled, other tooltips will become visible
        immediately instead of waiting this duration.
      </>
    ),
  });
  const [deactivateTime, deactivateTimeProps, { reset: resetDeactivateTime }] =
    useNumberField({
      id: "tooltip-deactive-time",
      min: 0,
      step: 100,
      defaultValue: DEFAULT_HOVER_MODE_DEACTIVATION_TIME,
      helpText: (
        <>
          The amount of time (in ms) before the hover mode behavior is disabled
          if no components within the <code>HoverModeProvider</code> have been
          hovered.
        </>
      ),
    });
  const [focusTime, focusTimeProps, { reset: resetFocusTime }] = useNumberField(
    {
      id: "tooltip-focus-time",
      min: 0,
      step: 100,
      defaultValue: DEFAULT_TOOLTIP_DELAY,
      helpText: (
        <>
          The amount of time (in ms) before a tooltip should become visible
          while a keyboard user is focusing the tooltipped component.
        </>
      ),
    }
  );
  const [touchTime, touchTimeProps, { reset: resetTouchTime }] = useNumberField(
    {
      id: "tooltip-touch-time",
      min: 0,
      step: 100,
      defaultValue: DEFAULT_TOOLTIP_DELAY,
      helpText: (
        <>
          The amount of time (in ms) the user must touch the toolipped component
          before the tooltip should become visible. You probably shouldn&apos;t
          modify this value since the default behavior overrides the{" "}
          <code>contextmenu</code> behavior for touch devices
        </>
      ),
    }
  );
  const [disableHoverMode, setDisableHoverMode] = useState(false);

  return (
    <HoverModeProvider
      disabled={disableHoverMode}
      defaultVisibleInTime={defaultVisibleInTime}
      deactivateTime={deactivateTime}
    >
      <Card>
        <CardHeader>
          <CardTitle>Tooltips</CardTitle>
        </CardHeader>
        <CardContent className={styles.container}>
          {Array.from({ length: 10 }, (_, i) => (
            <TooltippedButton
              id={`configurable-tooltip-button-${i + 1}`}
              key={i}
              tooltip={`Tooltip ${i + 1}`}
              focusTime={focusTime}
              touchTime={touchTime}
            >
              {`Button ${i + 1}`}
            </TooltippedButton>
          ))}
        </CardContent>
      </Card>
      <Card fullWidth className={styles.card}>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Grid cloneStyles columns={2} phoneColumns={1} desktopColumns={3}>
            <Form
              onReset={(event) => {
                event.preventDefault();

                resetDefaultVisibleInTime();
                resetDeactivateTime();
                resetFocusTime();
                resetTouchTime();
                setDisableHoverMode(false);
              }}
            >
              <TextFieldWithMessage
                {...defaultVisibleInTimeProps}
                label="hoverTime"
              />
              <TextFieldWithMessage
                {...deactivateTimeProps}
                label="deactivateTime"
              />
              <TextFieldWithMessage {...focusTimeProps} label="focusTime" />
              <TextFieldWithMessage {...touchTimeProps} label="touchTime" />
              <GridCell
                colSpan={2}
                desktop={{ colSpan: 3 }}
                phone={{ colSpan: 1 }}
              >
                <Checkbox
                  label="Disable hover mode"
                  id="tooltip-disable-hover-mode"
                  name="hoverMode"
                  checked={disableHoverMode}
                  onChange={(event) =>
                    setDisableHoverMode(event.currentTarget.checked)
                  }
                />
              </GridCell>
              <GridCell
                colSpan={2}
                desktop={{ colSpan: 3 }}
                phone={{ colSpan: 1 }}
              >
                <Button type="reset" theme="warning">
                  Reset
                </Button>
              </GridCell>
            </Form>
          </Grid>
        </CardContent>
      </Card>
    </HoverModeProvider>
  );
}
