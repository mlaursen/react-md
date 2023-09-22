import { MarkdownPage } from "@/components/MarkdownPage/MarkdownPage.jsx";
import { type ReactElement } from "react";
import * as props from "./HelloWorld.mdx";

export default function HomePage(): ReactElement {
  return <MarkdownPage {...props} />;
}
