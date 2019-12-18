import React, { FC, useEffect, useState } from "react";
import { getParameters } from "codesandbox/lib/api/define";

import { IFiles } from "codesandbox-import-utils/lib/api/define";

const CODE_SANDBOX_DEFINE_API =
  "https://codesandbox.io/api/v1/sandboxes/define";

export interface SandboxDefineFormProps {
  onCreated: () => void;
  getSandbox: () => Promise<IFiles>;
}

const SandboxDefineForm: FC<SandboxDefineFormProps> = ({
  onCreated,
  getSandbox,
}) => {
  const [parameters, setParameters] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async function load(): Promise<void> {
      const files = await getSandbox();
      if (!cancelled) {
        setParameters(getParameters({ files }));
      }
    })();

    return () => {
      cancelled = true;
    };
    // only want to run this on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
