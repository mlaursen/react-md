import { type TableOfContentsItem } from "@/components/TableOfContents/types.js";
import { Box, Divider, Typography, box, chip, link } from "react-md";
import Link from "next/link.js";
import { Fragment, type ReactElement } from "react";
import { InlineCode } from "../InlineCode.jsx";
import { LinkableHeading } from "../LinkableHeading.jsx";
import { Markdown } from "../Markdown.jsx";
import { MarkdownPage } from "../MarkdownPage/MarkdownPage.jsx";
import { ClientOrServer } from "./ClientOrServer.jsx";
import { type ComponentDocumentation } from "./types.js";
import styles from "./ApiDocs.module.scss";

export interface ApiDocsProps {
  toc?: readonly TableOfContentsItem[];
  docs: readonly ComponentDocumentation[];
}

export function ApiDocs(props: ApiDocsProps): ReactElement {
  const { toc, docs } = props;
  return (
    <MarkdownPage toc={toc}>
      {docs.map(({ id, name, isClient, description, props, extendedTypes }) => (
        <Fragment key={id}>
          <LinkableHeading id={id} level={1}>
            {name}
          </LinkableHeading>
          <ClientOrServer isClient={isClient} />
          {description && <Markdown markdown={description} />}
          <LinkableHeading id={`${id}-props`} level={1}>
            Props
          </LinkableHeading>
          {extendedTypes && (
            <>
              Also includes all props from:{" "}
              {extendedTypes.map(({ name, href }, i) => (
                <Fragment key={name}>
                  {i > 0 && ", "}
                  <Link href={href} className={link()}>
                    {name}
                  </Link>
                </Fragment>
              ))}
              .
            </>
          )}
          {props.map(
            ({ id, name, description, required, type, defaultValue }, i) => (
              <Fragment key={id}>
                {i > 0 && <Divider />}
                <div className={styles.section}>
                  <LinkableHeading
                    id={id}
                    level={6}
                    className={box({ disablePadding: true })}
                  >
                    <InlineCode disableTicks>{name}</InlineCode>
                    {required && (
                      <span
                        className={chip({
                          theme: "solid",
                          noninteractive: true,
                          backgroundColor: "error",
                        })}
                      >
                        {" Required"}
                      </span>
                    )}
                  </LinkableHeading>
                  {description && <Markdown markdown={description} />}
                  <Box disablePadding>
                    <Typography margin="none" fontWeight="bold">
                      Type:
                    </Typography>
                    <InlineCode>{type}</InlineCode>
                  </Box>
                  {defaultValue && (
                    <Box disablePadding>
                      <Typography margin="none" fontWeight="bold">
                        Default:
                      </Typography>
                      <InlineCode>{defaultValue}</InlineCode>
                    </Box>
                  )}
                </div>
              </Fragment>
            )
          )}
        </Fragment>
      ))}
    </MarkdownPage>
  );
}
