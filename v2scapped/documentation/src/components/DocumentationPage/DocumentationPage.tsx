import * as React from "react";
import cn from "classnames";

import "./documentation-page.scss";

export interface IDocumentationPageProps {
  className?: string;
  children?: React.ReactNode;
}

const DocumentationPage: React.FunctionComponent<IDocumentationPageProps> = ({ className, children }) => (
  <div className={cn("documentation-page", className)}>{children}</div>
);

export default DocumentationPage;
