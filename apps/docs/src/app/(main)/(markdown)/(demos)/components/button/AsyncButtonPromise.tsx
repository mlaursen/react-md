"use client";

import { AsyncButton } from "@react-md/core/button/AsyncButton";
import { wait } from "@react-md/core/utils/wait";
import { type ReactElement } from "react";

export default function AsyncButtonPromise(): ReactElement {
  return (
    <>
      <AsyncButton onClick={() => wait(4000)}>Click Me</AsyncButton>
      <AsyncButton
        onClick={() => wait(4000)}
        theme="primary"
        themeType="outline"
      >
        Click Me
      </AsyncButton>
      <AsyncButton
        onClick={() => wait(4000)}
        theme="secondary"
        themeType="contained"
      >
        Click Me
      </AsyncButton>
    </>
  );
}
