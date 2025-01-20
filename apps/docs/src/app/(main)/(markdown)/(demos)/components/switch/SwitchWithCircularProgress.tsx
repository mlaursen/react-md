"use client";

import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { Switch } from "@react-md/core/form/Switch";
import { CircularProgress } from "@react-md/core/progress/CircularProgress";
import { useAsyncFunction } from "@react-md/core/useAsyncFunction";
import { randomInt } from "@react-md/core/utils/randomInt";
import { wait } from "@react-md/core/utils/wait";
import { cnb } from "cnbuilder";
import { type ReactElement, useId, useState } from "react";

import styles from "./SwitchWithCircularProgress.module.scss";

export default function SwitchWithCircularProgress(): ReactElement {
  const id = useId();
  const [checked, setChecked] = useState(false);
  const { handleAsync, pending } = useAsyncFunction();
  return (
    <Form className={box()}>
      <Switch
        id={id}
        label="Label"
        ballAddon={pending && <CircularProgress aria-labelledby={id} />}
        checked={checked}
        onChange={handleAsync(async (event) => {
          const nextChecked = event.currentTarget.checked;
          setChecked(nextChecked);
          await wait(4000);

          // randomly fail some async action
          if (randomInt() % 3 === 0) {
            setChecked(!nextChecked);
          }
        })}
        ballClassName={cnb(pending && styles.pending)}
      />
    </Form>
  );
}
