import { type ReactElement } from "react";

import { GithubLink } from "@/components/GithubLink.jsx";

export interface SourceLinkProps {
  name: string;
}

export default function SourceLink(props: SourceLinkProps): ReactElement {
  const { name } = props;

  return (
    <GithubLink
      file={`packages/core/src/test-utils/${name}.ts`}
      position="absolute"
    />
  );
}
