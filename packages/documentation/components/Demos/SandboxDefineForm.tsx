import React, { FunctionComponent, useEffect, useState } from "react";
import { getParameters } from "codesandbox/lib/api/define";

import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { CODE_SANDBOX_DEFINE_API } from "constants/index";

export interface SandboxDefineFormProps {
  onCreated: () => void;
  title: string;
  description: string;
  packageName: string;
  getSandbox: () => Promise<IFiles>;
}

const SandboxDefineForm: FunctionComponent<SandboxDefineFormProps> = ({
  onCreated,
  title,
  description,
  packageName,
  getSandbox,
}) => {
  const [parameters, setParameters] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const files = await getSandbox();
      console.log("files:", files);
      if (!cancelled) {
        setParameters(getParameters({ files }));
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!parameters) {
    return null;
  }

  return (
    <form
      id="codesandbox-form"
      method="POST"
      target="_blank"
      action={CODE_SANDBOX_DEFINE_API}
      ref={form => {
        if (!form) {
          return;
        }

        form.submit();
        onCreated();
      }}
    >
      <input type="hidden" name="parameters" value={parameters} />
    </form>
  );
};

export default SandboxDefineForm;
