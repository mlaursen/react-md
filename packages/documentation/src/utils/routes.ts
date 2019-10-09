import qs from "qs";

type QueryParam = string | string[] | undefined;

const toString = (q: QueryParam): string => {
  if (!q) {
    return "";
  }

  if (Array.isArray(q)) {
    return q[0] || "";
  }

  return q;
};

export interface SandboxParams {
  pkg: string;
  name: string;
  from: string;
  fileName: string;
}
export type SandboxQuery = Partial<SandboxParams>;

export function parseSandbox(query?: SandboxQuery): SandboxParams {
  query = query || {};
  const pkg = toString(query.pkg);
  const name = toString(query.name);
  const from = toString(query.from);
  const fileName = toString(query.fileName) || "src/Demo.tsx";

  return {
    pkg,
    name,
    from,
    fileName,
  };
}

type SandboxOptions = Pick<SandboxParams, "pkg" | "name" | "from">;

export function toSandbox({ pkg, name, from }: SandboxOptions): string {
  return `/sandbox?${qs.stringify({ pkg, name, from })}`;
}
