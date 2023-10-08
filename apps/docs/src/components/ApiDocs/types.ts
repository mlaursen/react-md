export interface PropDocumentation {
  id: string;
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface NamedExample {
  name: string;
  code: string;
  lang: string;
}

export interface NamedExtendedType {
  name: string;
  href: string;
}

export interface ComponentDocumentation {
  id: string;
  name: string;
  props: readonly PropDocumentation[];
  isClient: boolean;
  examples: readonly NamedExample[];
  description: string;
  extendedTypes: readonly NamedExtendedType[];
}

export type ApiLookup = Record<string, readonly ComponentDocumentation[]>;
