import React from "react";
import InProgress from "./InProgress";
import { TextContainer } from "@react-md/typography";
import { Markdown } from "components/Markdown";

const description = `
This one will probably take me awhile to finish unfortunately and would gladly
accept help. Version 2 of \`react-md\`switched over to Typescript which caused
all of my generated documentation to be written in Typescript as well.
Unfortunately, the [typedoc](https://github.com/TypeStrong/typedoc) library is a
bit too verbose compared to
[react-docgen](https://github.com/reactjs/react-docgen) which I was using before
especially with how I've written my types and allow for all "native" DOM
attributes to be passed down to each component. I also tried out
[react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)
but it doesn't handle \`defaultProps\` correctly and is coupled a bit too much
into \`styleguidist\` to be fully configurable.
`;

export default () => (
  <InProgress title="API">
    <TextContainer>
      <Markdown>{description}</Markdown>
    </TextContainer>
  </InProgress>
);
