import { useEffect, useState, useRef } from "react";
import { useToggle } from "@react-md/utils";
import { IFiles } from "codesandbox-import-utils/lib/api/define";
import { ThemeMode } from "components/Theme";
import { getSandboxByQuery } from "utils/getSandbox";

interface SandboxQuery {
  js: boolean;
  pkg: string;
  name: string;
  theme: ThemeMode;
  pathname: string;
}
interface ReturnValue {
  sandbox: IFiles | null;
  loading: boolean;
}

export default function useSandbox(
  defaultSandbox: IFiles | null,
  { js, pkg, name, theme, pathname }: SandboxQuery
): ReturnValue {
  const [sandbox, setSandbox] = useState(defaultSandbox);
  const [loading, startLoading, stopLoading] = useToggle(!sandbox);
  const prevJs = useRef(js);
  if (prevJs.current !== js) {
    prevJs.current = js;
    startLoading();
  }

  useEffect(() => {
    if (defaultSandbox && !loading) {
      return;
    }

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
      const sandbox = await getSandboxByQuery({ js, pkg, name, theme });
      if (!cancelled) {
        setSandbox(sandbox);
        stopLoading();
      }
    })();

    return () => {
      cancelled = true;
      stopLoading();
    };
    // only want to run when these dependencies change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkg, name, pathname, js, theme]);

  return { sandbox, loading };
}
