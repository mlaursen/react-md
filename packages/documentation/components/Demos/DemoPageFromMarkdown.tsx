import React, { FunctionComponent } from "react";

const DemoPageFromMarkdown: FunctionComponent<{ markdown: string }> = ({
  markdown,
}) => {
  const parts = markdown.split(/(?=# [A-Z])/);
  console.log("parts:", parts);

  return null;
};

export default DemoPageFromMarkdown;
