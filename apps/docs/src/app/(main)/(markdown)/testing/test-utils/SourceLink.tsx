import { GithubLink } from "@/components/GithubLink.jsx";
import { type ReactElement } from "react";

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
