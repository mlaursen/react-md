/* eslint-disable react/no-danger */
import React, {
  HTMLAttributes,
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import cn from "classnames";
import { useRouter } from "next/router";

import styles from "./Markdown.module.scss";
import { markdownToHTML } from "./utils";

function useMarkdownResolver(markdown: MarkdownProps["children"]): string {
  /* eslint-disable react-hooks/rules-of-hooks */
  // i will never swap between strings and promises
  if (typeof markdown === "string") {
    return markdown;
  }

  const [resolved, setResolved] = useState("");
  useEffect(() => {
    markdown().then((md) => {
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
  const router = useRouter();
  useEffect(() => {
    const instance = ref.current;
    if (!instance) {
      return;
    }

    const { origin } = window.location;
    const links = Array.from(
      instance.querySelectorAll<HTMLAnchorElement>("a[href]")
    );

    links.forEach((link) => {
      if (link.href.startsWith(origin)) {
        link.onclick = (event) => {
          event.preventDefault();
          const href = link.href.replace(origin, "");

          router.push(href).then((success) => {
            if (success) {
              const [, hash] = href.split("#");
              if (hash) {
                const el = document.getElementById(hash);
                if (el && typeof el.focus === "function") {
                  el.focus();
                  return;
                }
              }

              window.scrollTo(0, 0);
            }
          });
        };
      }
    });
  }, [html, router]);

  return ref;
}

export type ResolveMarkdown = () => Promise<string | { default: string }>;
export type MarkdownChildren = string | ResolveMarkdown;

export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
  children: ResolveMarkdown | string;
  disableSinglePMargin?: boolean;
}

export default function Markdown({
  className,
  children,
  disableSinglePMargin,
  ...props
}: MarkdownProps): ReactElement {
  const html = useHTML(children);
  const ref = useCustomMarkdownBehavior(html);

  return (
    <>
      <div
        {...props}
        ref={ref}
        className={cn(
          styles.container,
          {
            [styles.marginless]: disableSinglePMargin,
          },
          className
        )}
        dangerouslySetInnerHTML={html}
      />
    </>
  );
}
