import React, { Fragment } from "react";

import { MarkdownPage } from "components/Markdown";

import markdown from "./Typography.md";

export default () => (
  <Fragment>
    <MarkdownPage>{markdown}</MarkdownPage>
  </Fragment>
);
