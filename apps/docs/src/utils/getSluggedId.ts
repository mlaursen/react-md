import type GithubSlugger from "github-slugger";
import { Children, isValidElement, type ReactNode } from "react";

const getTextFromChildren = (children: ReactNode): string => {
  if (!children) {
    return "";
  }

  if (typeof children === "string" || typeof children === "number") {
    return `${children}`;
  }

  if (isValidElement<{ children: ReactNode; hidden?: boolean }>(children)) {
    if (children.props.hidden) {
      return "";
    }

    return getTextFromChildren(children.props.children);
  }

  const childList = Children.toArray(children);
  let text = "";
  for (const child of childList) {
    if (typeof child === "string" || typeof child === "number") {
      text += `${child}`;
    } else if (
      isValidElement<{ children: ReactNode; hidden?: boolean }>(child) &&
      !child.props.hidden
    ) {
      text += getTextFromChildren(child.props.children);
    }
  }

  return text;
};

export const getSluggedId = (
  slugger: GithubSlugger,
  children?: ReactNode
): string => slugger.slug(getTextFromChildren(children));
