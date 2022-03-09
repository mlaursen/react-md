import { useEffect, useState, useRef } from "react";
import type { IFiles } from "codesandbox-import-utils/lib/api/define";
import type { ThemeMode } from "components/Theme";
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
  const [isLoading, setLoading] = useState(false);
  const prevJs = useRef(js);
  const loading = isLoading || prevJs.current !== js;

  useEffect(() => {
    if (prevJs.current === js) {
      return;
    }

    prevJs.current = js;
    if (!pkg || !name || !pathname.startsWith("/sandbox")) {
      setSandbox(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    async function load(): Promise<void> {
      const sandbox = await getSandboxByQuery({ js, pkg, name, theme });
      if (!cancelled) {
        setLoading(false);
        setSandbox(sandbox);
      }
    }
    load();

    return () => {
      cancelled = true;
    };
  }, [js, pkg, name, theme, pathname]);

  return { sandbox, loading };
}
