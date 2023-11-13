"use client";
import {
  CircularProgress,
  Form,
  Switch,
  box,
  randomInt,
  useAsyncAction,
  wait,
} from "@react-md/core";
import { useState, type ReactElement, useId } from "react";

export default function SwitchWithCircularProgress(): ReactElement {
  const id = useId();
  const [checked, setChecked] = useState(false);
  const { handleAsync, pending } = useAsyncAction();
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
        ballStyle={{
          // set the background color to the inactive color so that the circular
          // progress bar will be visible while checked
          "--rmd-switch-ball-background-color": pending ? "#f2f2f2" : undefined,
        }}
      />
    </Form>
  );
}
