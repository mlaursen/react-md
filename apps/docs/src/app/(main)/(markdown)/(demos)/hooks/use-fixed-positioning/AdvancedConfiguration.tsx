"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@react-md/core/button/Button";
import { Card } from "@react-md/core/card/Card";
import { CardContent } from "@react-md/core/card/CardContent";
import { cardContent } from "@react-md/core/card/styles";
import { Divider } from "@react-md/core/divider/Divider";
import { Checkbox } from "@react-md/core/form/Checkbox";
import { FormMessageContainer } from "@react-md/core/form/FormMessageContainer";
import { Option } from "@react-md/core/form/Option";
import { Select } from "@react-md/core/form/Select";
import { TextField } from "@react-md/core/form/TextField";
import { useNumberField } from "@react-md/core/form/useNumberField";
import { TextIconSpacing } from "@react-md/core/icon/TextIconSpacing";
import {
  ABOVE_CENTER_ANCHOR,
  ABOVE_INNER_LEFT_ANCHOR,
  ABOVE_INNER_RIGHT_ANCHOR,
  ABOVE_LEFT_ANCHOR,
  ABOVE_RIGHT_ANCHOR,
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BELOW_INNER_RIGHT_ANCHOR,
  BELOW_LEFT_ANCHOR,
  BELOW_RIGHT_ANCHOR,
  BOTTOM_CENTER_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  BOTTOM_LEFT_ANCHOR,
  BOTTOM_RIGHT_ANCHOR,
  CENTER_CENTER_ANCHOR,
  CENTER_INNER_LEFT_ANCHOR,
  CENTER_INNER_RIGHT_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  TOP_CENTER_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_LEFT_ANCHOR,
  TOP_RIGHT_ANCHOR,
} from "@react-md/core/positioning/constants";
import { type PositionWidth } from "@react-md/core/positioning/types";
import { useFixedPositioning } from "@react-md/core/positioning/useFixedPositioning";
import { Tab } from "@react-md/core/tabs/Tab";
import { TabList } from "@react-md/core/tabs/TabList";
import { useTabs } from "@react-md/core/tabs/useTabs";
import { Slide } from "@react-md/core/transition/Slide";
import { SlideContainer } from "@react-md/core/transition/SlideContainer";
import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
import {
  SCALE_CLASSNAMES,
  SCALE_TIMEOUT,
} from "@react-md/core/transition/useScaleTransition";
import ErrorIcon from "node_modules/@react-md/material-icons/src/ErrorIcon.jsx";
import { type ReactElement, useEffect, useRef, useState } from "react";

export default function AdvancedConfiguration(): ReactElement {
  const fixedTo = useRef<HTMLButtonElement>(null);
  const configuration = useConfiguration();
  const {
    transitionIn,
    setTransitionIn,
    anchor,
    disabled,
    disableSwapping,
    disableVHBounds,
    preventOverlap,
    transformOrigin,
    vhMargin,
    vwMargin,
    yMargin,
    xMargin,
    width,
  } = configuration;

  // the `ref` will be merged with the `nodeRef` if it was provided and the `callbacks`
  // can be used for composition and not using the `useCSSTransition` behavior
  // immediately.
  const { ref, style, callbacks, transitionOptions, updateStyle } =
    useFixedPositioning({
      fixedTo,
      anchor: ANCHORS[anchor],

      // completely disable the positioning behavior and no inline styles are
      // created
      disabled,

      // prevent swapping the position to better fit within the viewport
      disableSwapping,

      // use `position: absolute` behavior
      disableVHBounds,

      // initialX,
      // initialY,
      // nodeRef,

      // prevent the fixed element to overlap the fixed to element
      preventOverlap,

      // include a `transform-origin` value based on the current anchor after the
      // position has been calculated
      transformOrigin,

      // additional margin at the top and bottom of the viewport so the fixed element
      // doesn't need to touch the viewport edge
      vhMargin,

      // additional margin at the left and right of the viewport so the fixed element
      // doesn't need to touch the viewport edge
      vwMargin,
      xMargin,
      yMargin,

      width,

      // transition handlers that are merged with the fixed position behavior and
      // can be used to implement custom behavior like setup/teardown
      onEnter(appearing) {
        // do something
      },
      onEntering(appearing) {
        // do something
      },
      onEntered(appearing) {
        // do something
      },
      onExited() {
        // do something
      },

      // this is a native resize event and can be used to do things like hiding
      // the fixed element
      onResize(event) {
        // do something
      },

      // the event will be a native scroll event if that is required for
      // anything while the `data` is an object containing:
      // - `fixedElement` - in this demo, it is the `Card`
      // - `fixedToElement` - in this demo, it is the `Button`
      // - `visible` - `true` if either the `fixedToElement` or `fixedElement`
      //   are visible within the viewport
      onScroll(event, data) {
        // do something

        // NOTE: This will never be `false` if `disableSwapping` is `true` since the
        // element will continue to have its position updated as the user scrolls
        if (!data.visible) {
          setTransitionIn(false);
        }
      },

      // The position options need to be dynamically calculated in a callback
      // using this option.
      getFixedPositionOptions() {
        return {};
        // supports all the following position options:
        //   return {
        //     anchor,
        //     disableSwapping,
        //     disableVHBounds,
        //     initialX,
        //     initialY,
        //     preventOverlap,
        //     transformOrigin,
        //     vhMargin,
        //     vwMargin,
        //     width,
        //     xMargin,
        //     yMargin,
        //   };
      },

      // any custom style to be applied and will **override** any
      // generated styles
      style: {
        // a z-index isn't created by default, so add one for this demo
        zIndex: 3,
        // these would override the position styles
        // top: 0,
        // left: 100,
        // position: "static",
      },
    });
  const { elementProps, rendered } = useCSSTransition({
    ...transitionOptions,
    transitionIn,
    temporary: true,
    // any transition could be used
    timeout: SCALE_TIMEOUT,
    classNames: SCALE_CLASSNAMES,
  });

  useEffect(() => {
    // show the changes immediately
    if (transitionIn) {
      updateStyle();
    }
  }, [
    transitionIn,
    updateStyle,
    anchor,
    disabled,
    disableSwapping,
    disableVHBounds,
    preventOverlap,
    transformOrigin,
    vhMargin,
    vwMargin,
    yMargin,
    xMargin,
    width,
  ]);

  return (
    <>
      <Button ref={fixedTo} onClick={() => setTransitionIn(!transitionIn)}>
        Toggle
      </Button>
      {rendered && (
        <Card {...elementProps} style={style}>
          <CardContent>Fixed Temporary Element</CardContent>
        </Card>
      )}
      <Configuration {...configuration} />
    </>
  );
}

const ANCHORS = {
  ABOVE_LEFT_ANCHOR,
  ABOVE_INNER_LEFT_ANCHOR,
  ABOVE_CENTER_ANCHOR,
  ABOVE_INNER_RIGHT_ANCHOR,
  ABOVE_RIGHT_ANCHOR,
  TOP_LEFT_ANCHOR,
  TOP_INNER_LEFT_ANCHOR,
  TOP_CENTER_ANCHOR,
  TOP_INNER_RIGHT_ANCHOR,
  TOP_RIGHT_ANCHOR,
  CENTER_LEFT_ANCHOR,
  CENTER_INNER_LEFT_ANCHOR,
  CENTER_CENTER_ANCHOR,
  CENTER_INNER_RIGHT_ANCHOR,
  CENTER_RIGHT_ANCHOR,
  BOTTOM_LEFT_ANCHOR,
  BOTTOM_INNER_LEFT_ANCHOR,
  BOTTOM_CENTER_ANCHOR,
  BOTTOM_INNER_RIGHT_ANCHOR,
  BOTTOM_RIGHT_ANCHOR,
  BELOW_LEFT_ANCHOR,
  BELOW_INNER_LEFT_ANCHOR,
  BELOW_CENTER_ANCHOR,
  BELOW_INNER_RIGHT_ANCHOR,
  BELOW_RIGHT_ANCHOR,
} as const;

const WIDTHS = {
  auto: "The fixed element's width is determined by the fixed element's content.",
  equal: "The fixed element's width is set to the fixed to element's width.",
  min: "The fixed element's width is at least equal to the fixed to element's width.",
} satisfies Record<PositionWidth, string>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useConfiguration() {
  const [transitionIn, setTransitionIn] = useState(false);
  const [anchor, setAnchor] = useState<keyof typeof ANCHORS>(
    "BELOW_CENTER_ANCHOR"
  );
  const [disabled, setDisabled] = useState(false);
  const [disableSwapping, setDisableSwapping] = useState(false);
  const [disableVHBounds, setDisableVHBounds] = useState(false);
  const [preventOverlap, setPreventOverlap] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState(false);
  const { fieldProps: vhMarginFieldProps, value: vhMargin } = useNumberField({
    name: "vhMargin",
    defaultValue: 16,
    helpText:
      "Additional margin applied at the top and bottom of the viewport so the fixed element doesn't need to touch the viewport edge.",
  });
  const { fieldProps: vwMarginFieldProps, value: vwMargin } = useNumberField({
    name: "vwMargin",
    defaultValue: 16,
    helpText:
      "Additional margin applied at the left and right of the viewport so the fixed element doesn't need to touch the viewport edge.",
  });
  const { fieldProps: yMarginFieldProps, value: yMargin } = useNumberField({
    name: "yMargin",
    defaultValue: 0,
    helpText:
      "Used to add vertical spacing between the fixed and fixed to elements.",
  });
  const { fieldProps: xMarginFieldProps, value: xMargin } = useNumberField({
    name: "xMargin",
    defaultValue: 0,
    helpText:
      "Used to add horizontal spacing between the fixed and fixed to elements.",
  });
  const [width, setWidth] = useState<PositionWidth>("auto");

  return {
    transitionIn,
    setTransitionIn,
    anchor,
    setAnchor,
    disabled,
    setDisabled,
    disableSwapping,
    setDisableSwapping,
    disableVHBounds,
    setDisableVHBounds,
    preventOverlap,
    setPreventOverlap,
    transformOrigin,
    setTransformOrigin,
    vhMargin,
    vhMarginFieldProps,
    vwMargin,
    vwMarginFieldProps,
    yMargin,
    yMarginFieldProps,
    xMargin,
    xMarginFieldProps,
    width,
    setWidth,
  };
}

function Configuration({
  anchor,
  setAnchor,
  disabled,
  setDisabled,
  disableSwapping,
  setDisableSwapping,
  disableVHBounds,
  setDisableVHBounds,
  preventOverlap,
  setPreventOverlap,
  transformOrigin,
  setTransformOrigin,
  vhMarginFieldProps,
  vwMarginFieldProps,
  yMarginFieldProps,
  xMarginFieldProps,
  width,
  setWidth,
}: ReturnType<typeof useConfiguration>): ReactElement {
  const { getTabProps, getTabListProps, getTabPanelsProps, getTabPanelProps } =
    useTabs();

  const isPreventOverlapDisabled =
    ANCHORS[anchor].y !== "above" && ANCHORS[anchor].y !== "below";
  return (
    <>
      <Divider />
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps(0)}>Calculations</Tab>
        <Tab {...getTabProps(1)}>Positioning</Tab>
      </TabList>
      <SlideContainer {...getTabPanelsProps()}>
        <Slide {...getTabPanelProps(0)} className={cardContent()}>
          <FormMessageContainer
            messageProps={{
              children:
                "Used to determine how the fixed element is positioned relative to the fixed to element.",
            }}
          >
            <Select
              label="anchor"
              name="anchor"
              value={anchor}
              onChange={(event) => {
                const nextAnchorKey = event.currentTarget.value;
                const nextAnchorY = ANCHORS[nextAnchorKey].y;
                setAnchor(nextAnchorKey);
                if (nextAnchorY !== "above" && nextAnchorY !== "below") {
                  setPreventOverlap(false);
                }
              }}
            >
              {Object.entries(ANCHORS).map(([value, anchor]) => (
                <Option
                  key={value}
                  value={value}
                  secondaryText={<code>{JSON.stringify(anchor, null, 2)}</code>}
                >
                  {value}
                </Option>
              ))}
            </Select>
          </FormMessageContainer>
          <FormMessageContainer
            messageProps={{
              children:
                "Used to determine the width of the fixed element relative to the fixed to element.",
            }}
          >
            <Select
              label="width"
              name="width"
              value={width}
              onChange={(event) => setWidth(event.currentTarget.value)}
            >
              {Object.entries(WIDTHS).map(([value, description]) => (
                <Option key={value} value={value} secondaryText={description}>
                  {value}
                </Option>
              ))}
            </Select>
          </FormMessageContainer>
          <TextField {...vhMarginFieldProps} label="vhMargin" />
          <TextField {...vwMarginFieldProps} label="vwMargin" />
          <TextField {...yMarginFieldProps} label="yMargin" />
          <TextField {...xMarginFieldProps} label="xMargin" />
        </Slide>
        <Slide {...getTabPanelProps(1)}>
          <Checkbox
            label="disabled"
            name="disabled"
            checked={disabled}
            onChange={(event) => setDisabled(event.currentTarget.checked)}
            messageProps={{
              children: "Disable all behavior and remove any styling.",
            }}
          />
          <Checkbox
            label="disableSwapping"
            name="disableSwapping"
            checked={disableSwapping}
            onChange={(event) =>
              setDisableSwapping(event.currentTarget.checked)
            }
            messageProps={{
              children:
                "No longer attempt to swap the position to fit within the viewport.",
            }}
          />
          <Checkbox
            label="disableVHBounds"
            name="disableVHBounds"
            checked={disableVHBounds}
            onChange={(event) =>
              setDisableVHBounds(event.currentTarget.checked)
            }
            messageProps={{
              children: "Use absolute positioning instead of fixed.",
            }}
          />
          <Checkbox
            label="preventOverlap"
            name="preventOverlap"
            disabled={isPreventOverlapDisabled}
            checked={preventOverlap}
            onChange={(event) => setPreventOverlap(event.currentTarget.checked)}
            messageProps={{
              error: isPreventOverlapDisabled,
              children: isPreventOverlapDisabled ? (
                <TextIconSpacing icon={<ErrorIcon inline theme="error" />}>
                  {
                    'Unable to prevent overlap when the vertical anchor is not `"above"` or `"below"'
                  }
                </TextIconSpacing>
              ) : (
                <>
                  Never allow the fixed element to overlap the fixed to element
                  which is mostly useful when rendering a fixed element with a
                  text input.
                </>
              ),
            }}
          />
          <Checkbox
            label="transformOrigin"
            name="transformOrigin"
            checked={transformOrigin}
            onChange={(event) =>
              setTransformOrigin(event.currentTarget.checked)
            }
            messageProps={{
              children:
                "Add a transform-origin based on the current calculated anchor to add a nicer scale transition.",
            }}
          />
        </Slide>
      </SlideContainer>
    </>
  );
}
