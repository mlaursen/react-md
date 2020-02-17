/* eslint-disable react/no-danger */
import React, {
  FC,
  Fragment,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import cn from "classnames";
import Router from "next/router";

import GoogleFont from "components/GoogleFont";

import "./Markdown.scss";
import { markdownToHTML } from "./utils";

function useMarkdownResolver(markdown: MarkdownProps["children"]): string {
  /* eslint-disable react-hooks/rules-of-hooks */
  // i will never swap between strings and promises
  if (typeof markdown === "string") {
    return markdown;
  }

  const [resolved, setResolved] = useState("");
  useEffect(() => {
    markdown().then(md => {
      if (typeof md === "string") {
        setResolved(md);
      } else if (typeof md.default === "string") {
        setResolved(md.default);
      }
    });
  }, [markdown]);

  return resolved;
}

interface DangerHTML {
  __html: string;
}

function useHTML(children: MarkdownChildren): DangerHTML {
  const markdown = useMarkdownResolver(children);
  const html = useMemo(
    () => ({
      __html: markdownToHTML(markdown),
    }),
    [markdown]
  );

  return html;
}

function useCustomMarkdownBehavior({
  __html: html,
}: DangerHTML): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const instance = ref.current;
    if (!instance) {
      return;
    }

    const { origin } = window.location;
    const links = Array.from(
      instance.querySelectorAll<HTMLAnchorElement>("a[href]")
    );

    links.forEach(link => {
      if (link.href.startsWith(origin)) {
        link.onclick = event => {
          event.preventDefault();
          const href = link.href.replace(origin, "");

          // convert the href into an as+href if it's a known guide
          const [, guide] = href.match(/\/guides\/([a-z]+(-[a-z]+)*)$/) || [
            "",
            "",
          ];

          if (guide) {
            Router.push(href.replace(guide, "[id]"), href);
          } else {
            Router.push(href);
          }
        };
      }
    });

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const lazyElements = Array.from(
      instance.querySelectorAll<HTMLIFrameElement>("iframe, img")
    );

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target as HTMLIFrameElement | HTMLIFrameElement;
        // guarenteed to have a data-src by this point
        element.src = element.dataset.src as string;
      });
    });

    lazyElements.forEach(element => {
      const { src } = element.dataset;
      if (!src) {
        if (process.env.NODE_ENV !== "production") {
          /* eslint-disable no-console */
          console.warn(
            "Found an image or iframe without a `data-src` which means the iframe can't be lazy loaded."
          );
          console.warn(element);
        }
        return;
      }

      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [html]);

  return ref;
}

export type ResolveMarkdown = () => Promise<string | { default: string }>;
export type MarkdownChildren = string | ResolveMarkdown;

export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
  children: ResolveMarkdown | string;
  disableSinglePMargin?: boolean;
}

const Markdown: FC<MarkdownProps> = ({
  className,
  children,
  disableSinglePMargin,
  ...props
}) => {
  const html = useHTML(children);
  const ref = useCustomMarkdownBehavior(html);

  return (
    <Fragment>
      <GoogleFont font="Source Code Pro" />
      <div
        {...props}
        ref={ref}
        className={cn(
          "markdown-container",
          { "markdown-container--no-p-margin": disableSinglePMargin },
          className
        )}
        dangerouslySetInnerHTML={html}
      />
    </Fragment>
  );
};

export default Markdown;
