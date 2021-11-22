import { ReactElement, ReactNode } from "react";
import { Divider } from "@react-md/divider";
import { TextIconSpacing } from "@react-md/icon";
import { KeyboardArrowRightSVGIcon } from "@react-md/material-icons";
import { Typography, TextContainer } from "@react-md/typography";

import { GITHUB_URL } from "constants/github";
import Heading from "components/Heading";
import Link from "components/Link";
import LinkButton from "components/LinkButton";
import { Markdown } from "components/Markdown";
import RelativeDate from "components/RelativeDate";
import { toId } from "utils/toTitle";

import styles from "./Post.module.scss";

export interface BlogPost {
  title: string;
  date: string;
  readMore: string | null;
  summary: string;
  bullets: readonly string[];
}

export interface PostProps extends BlogPost {
  isLast: boolean;
}

function resolveReadMore(readMore: string | null): string | null {
  if (readMore === null) {
    return null;
  }

  // github issue read more
  if (readMore.startsWith("#")) {
    return `${GITHUB_URL}/issues/${readMore.substring(1)}`;
  }

  // general link
  if (/^https?:\/\//.test(readMore)) {
    return readMore;
  }

  // link to specific blog
  return `/blog/${readMore}`;
}

export default function Post({
  title,
  date,
  readMore,
  summary,
  bullets,
  isLast,
}: PostProps): ReactElement {
  const href = resolveReadMore(readMore);

  return (
    <>
      <TextContainer className={styles.container}>
        <Heading id={toId(title)} level={5} margin="top" component="h3">
          {title}
        </Heading>
        <Typography
          color="secondary"
          type="body-2"
          component="p"
          margin="bottom"
        >
          <RelativeDate date={date} />
        </Typography>
        <Markdown>{summary}</Markdown>
        {bullets.length > 0 && (
          <Typography component="ul" type="subtitle-1">
            {bullets.map((bullet) => {
              let content: ReactNode = <Markdown>{bullet}</Markdown>;
              if (href) {
                const id = toId(bullet);
                content = <Link href={`${href}#${id}`}>{bullet}</Link>;
              }

              return <li key={bullet}>{content}</li>;
            })}
          </Typography>
        )}
        {href && (
          <LinkButton href={href} theme="secondary" className={styles.button}>
            <TextIconSpacing icon={<KeyboardArrowRightSVGIcon />} iconAfter>
              Read More
            </TextIconSpacing>
          </LinkButton>
        )}
      </TextContainer>
      {!isLast && <Divider />}
    </>
  );
}
