import React, { FC, useCallback, useState } from "react";
import { Button } from "@react-md/button";
import { Checkbox, Form, useCheckboxState } from "@react-md/form";
import { CloseSVGIcon } from "@react-md/material-icons";
import { Overlay } from "@react-md/overlay";
import { ScaleTransition } from "@react-md/transition";
import { bem, FocusContainer } from "@react-md/utils";

import Page1 from "./Page1";
import "./ScaleTransitionExample.scss";

const styles = bem("scale-transition-example");

const ScaleTransitionExample: FC = () => {
  const [visible, setVisible] = useState(false);
  const [temporary, onTemporaryChange] = useCheckboxState(false);
  const [vertical, onVerticalChange] = useCheckboxState(false);
  const hide = useCallback(() => setVisible(false), []);

  return (
    <div className={styles({ temporary })}>
      <Form>
        <Checkbox
          id="scale-transition-temporary"
          label="Temporary"
          checked={temporary}
          onChange={onTemporaryChange}
        />
        <Checkbox
          id="scale-transition-vertical"
          label="Vertical"
          checked={vertical}
          onChange={onVerticalChange}
        />
        <Button onClick={() => setVisible(!visible)}>Toggle</Button>
      </Form>
      <ScaleTransition visible={visible} vertical={vertical}>
        <FocusContainer
          className={styles("popup", { temporary })}
          disableFocusOnMount={!temporary}
        >
          {temporary && (
            <Button
              onClick={hide}
              buttonType="icon"
              aria-label="Close"
              className={styles("close")}
            >
              <CloseSVGIcon />
            </Button>
          )}
          <Page1 />
        </FocusContainer>
      </ScaleTransition>
      <Overlay visible={visible && temporary} onRequestClose={hide} />
    </div>
  );
};

export default ScaleTransitionExample;
