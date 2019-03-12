import React, { FunctionComponent, useEffect, useState } from "react";
import { getParameters } from "codesandbox/lib/api/define";

import { CODE_SANDBOX_DEFINE_API } from "constants/index";

export interface SandboxDefineFormProps {
  onCreated: () => void;
  title: string;
  description: string;
  packageName: string;
  getSandbox: () => Promise<any>;
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
      const demoTitle = `${packageName} Example - ${title}`;
      const baseSandbox = await getSandbox();
      const indexHtml = await import("raw-loader!./index.html").then(
        content => ({
          isBinary: false,
          content: content.default as string,
        })
      );
      indexHtml.content.replace(/{{DEMO_TITLE}}/, demoTitle);

      const packageJson = baseSandbox["package.json"];
      const devDependencies = {
        ...packageJson.devDependencies,
        "react-scripts": "latests",
      };

      const scripts = {
        start: "react-scripts start",
      };

      const files = {
        ...baseSandbox,
        "public/index.html": indexHtml,
        "package.json": {
          isBinary: false,
          content: {
            main: "src/index.tsx",
            title: demoTitle,
            description,
            dependencies: packageJson.dependencies,
            devDependencies,
            scripts,
          },
        },
      };

      if (!cancelled) {
        // typescript def isn't correct since there's a special usecase for the
        // package.json file

        // @ts-ignore
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
