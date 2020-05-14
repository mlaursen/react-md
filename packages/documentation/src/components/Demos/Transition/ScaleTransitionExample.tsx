import React, { FC, useCallback, useState } from "react";
import cn from "classnames";
import { Button } from "@react-md/button";
import { Checkbox, Form, useChecked } from "@react-md/form";
import { CloseSVGIcon } from "@react-md/material-icons";
import { Overlay } from "@react-md/overlay";
import { ScaleTransition } from "@react-md/transition";
import { FocusContainer } from "@react-md/utils";

import Page1 from "./Page1";
import styles from "./ScaleTransitionExample.module.scss";

const ScaleTransitionExample: FC = () => {
  const [visible, setVisible] = useState(false);
  const [temporary, onTemporaryChange] = useChecked(false);
  const [vertical, onVerticalChange] = useChecked(false);
  const hide = useCallback(() => setVisible(false), []);

  return (
    <div className={styles.container}>
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
          className={cn({ [styles.temporary]: temporary })}
          disableFocusOnMount={!temporary}
        >
          {temporary && (
            <Button
              onClick={hide}
              buttonType="icon"
              aria-label="Close"
              className={styles.close}
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
