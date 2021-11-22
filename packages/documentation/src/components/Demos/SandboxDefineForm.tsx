import { ReactElement, useEffect, useState } from "react";
import { getParameters } from "codesandbox/lib/api/define";

import { useCodePreference } from "components/CodePreference";
import useTheme from "components/Theme/useTheme";
import { EventName, sendAnalyticsEvent } from "utils/analytics";
import getSandbox from "utils/getSandbox";

const CODE_SANDBOX_DEFINE_API =
  "https://codesandbox.io/api/v1/sandboxes/define";

export interface SandboxDefineFormProps {
  demoName: string;
  packageName: string;
  onCreated: () => void;
}

export default function SandboxDefineForm({
  demoName,
  packageName,
  onCreated,
}: SandboxDefineFormProps): ReactElement | null {
  const [parameters, setParameters] = useState("");
  const { theme } = useTheme();
  const { pref } = useCodePreference();
  const isJs = pref === "js";

  useEffect(() => {
    const getter = getSandbox(packageName, demoName, theme, isJs);
    if (!getter) {
      if (process.env.NODE_ENV !== "production") {
        throw new Error(
          "No sandbox found. Run `yarn sandbox` to generate demo sandboxes."
        );
      }

      return;
    }

    let cancelled = false;
    (async function load(): Promise<void> {
      const files = await getter();
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
        sendAnalyticsEvent({
          name: EventName.CreateSandbox,
          demoName,
          packageName,
          lang: pref,
        });
        onCreated();
      }}
    >
      <input type="hidden" name="parameters" value={parameters} />
    </form>
  );
}
