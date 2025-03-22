import { type MDXComponents } from "mdx/types.js";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import { type ReactElement } from "react";

import { CUSTOM_MDX_COMPONENTS } from "./CustomMdxComponents.jsx";

export type MarkdownProps = MDXRemoteProps;

export function Markdown(props: MarkdownProps): ReactElement {
  return (
    <MDXRemote
      {...props}
      // this is typecast since I have custom types available through my
      // plugins which aren't captured here.
      components={CUSTOM_MDX_COMPONENTS as unknown as MDXComponents}
    />
  );
}
