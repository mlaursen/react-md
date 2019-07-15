import { useState, useEffect } from "react";
import { getSandboxByQuery } from "utils/getSandbox";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { useToggle } from "@react-md/utils";

interface SandboxQuery {
  pkg: string;
  name: string;
  pathname: string;
}

export default function useSandbox(
  defaultSandbox: IFiles | null,
  { pkg, name, pathname }: SandboxQuery
) {
  const [sandbox, setSandbox] = useState(defaultSandbox);
  const [loading, startLoading, stopLoading] = useToggle(false);
  useEffect(() => {
    if (!pkg || !name || !pathname.startsWith("/sandbox")) {
      stopLoading();
      if (sandbox) {
        setSandbox(null);
      }
      return;
    }

    let cancelled = false;
    (async function load() {
      startLoading();
      const sandbox = await getSandboxByQuery({ pkg, name });
      if (!cancelled) {
        setSandbox(sandbox);
        stopLoading();
      }
    })();

    return () => {
      cancelled = true;
      stopLoading();
    };
  }, [pkg, name, pathname]);

  return { sandbox, loading };
}
