import React, { Fragment, FunctionComponent } from "react";
import { Portal } from "@react-md/portal";
import { Omit, useToggle } from "@react-md/utils";

import AppBarAction from "components/AppBarAction";
import CodeSandboxSVGIcon from "icons/CodeSandboxSVGIcon";

import SandboxDefineForm, { SandboxDefineFormProps } from "./SandboxDefineForm";

export interface SandboxProps
  extends Omit<SandboxDefineFormProps, "onCreated"> {
  id: string;
}

const Sandbox: FunctionComponent<SandboxProps> = ({
  id,
  title,
  description,
  packageName,
  getSandbox,
}) => {
  const { toggled: loading, enable, disable } = useToggle();

  return (
    <Fragment>
      <Portal>
        {loading && (
          <SandboxDefineForm
            title={title}
            description={description}
            packageName={packageName}
            getSandbox={getSandbox}
            onCreated={disable}
          />
        )}
      </Portal>
      <AppBarAction
        id={id}
        tooltip="Create a code sandbox for this example to live demo."
        onClick={enable}
        disabled={loading}
      >
        <CodeSandboxSVGIcon />
      </AppBarAction>
    </Fragment>
  );
};

export default Sandbox;
