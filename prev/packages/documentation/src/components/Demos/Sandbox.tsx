import type { ReactElement } from "react";
import { Portal } from "@react-md/portal";
import { useToggle } from "@react-md/utils";

import AppBarAction from "components/AppBarAction";
import { useJs } from "components/CodePreference";
import CodeSandboxSVGIcon from "icons/CodeSandboxSVGIcon";

import SandboxDefineForm from "./SandboxDefineForm";

export interface SandboxProps {
  id: string;
  demoName: string;
  packageName: string;
}

export default function Sandbox({
  id,
  demoName,
  packageName,
}: SandboxProps): ReactElement {
  const [loading, enable, disable] = useToggle(false);
  const isJs = useJs();
  const label = `Create ${isJs ? "Javascript" : "TypeScript"} Code Sandbox`;

  return (
    <>
      <Portal>
        {loading && (
          <SandboxDefineForm
            demoName={demoName}
            packageName={packageName}
            onCreated={disable}
          />
        )}
      </Portal>
      <AppBarAction
        id={id}
        aria-label={label}
        tooltip={label}
        onClick={enable}
        disabled={loading}
      >
        <CodeSandboxSVGIcon />
      </AppBarAction>
    </>
  );
}
