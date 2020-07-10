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
      const sandbox = await getSandbox();
      const files = Object.entries(sandbox).reduce<IFiles>(
        (files, [fileName, data]) => {
          let { content } = data;
          if (typeof content === "string") {
            content = content.replace(/{{RMD_VERSION}}/g, "latest");
          } else if (fileName === "package.json") {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            // the IFiles type is incorrect since it doesn't include the type for package.json
            const dependencies = (content as any).dependencies as Record<
              string,
              string
            >;

            const updated = Object.entries(dependencies).reduce(
              (json, [key, value]) => ({
                ...json,
                [key]: value.replace(/{{RMD_VERSION}}/g, "latest"),
              }),
              {}
            );

            content = { ...(content as any), dependencies: updated };
            /* eslint-enable @typescript-eslint/no-explicit-any */
          }

          files[fileName] = { ...data, content };

          return files;
        },
        {}
      );
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
      ref={(form) => {
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
