import React, { FC, ReactNode } from "react";
import { Divider } from "@react-md/divider";
import { TextIconSpacing } from "@react-md/icon";
import { KeyboardArrowRightSVGIcon } from "@react-md/material-icons";
import { Text, TextContainer } from "@react-md/typography";

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

function resolveReadMore(
  readMore: string | null
): [] | [string] | [string, string] {
  if (readMore === null) {
    return [];
  }

  // github issue read more
  if (readMore.startsWith("#")) {
    return [`${GITHUB_URL}/issues/${readMore.substring(1)}`];
  }

  // general link
  if (/^https?:\/\//.test(readMore)) {
    return [readMore];
  }

  // link to specific blog
  return ["/blog/[id]", `/blog/${readMore}`];
}

const Post: FC<PostProps> = ({
  title,
  date,
  readMore,
  summary,
  bullets,
  isLast,
}) => {
  const [href, asLink] = resolveReadMore(readMore);

  return (
    <>
      <TextContainer className={styles.container}>
        <Heading id={toId(title)} level={5} margin="top" component="h3">
          {title}
        </Heading>
        <Text color="secondary" type="body-2" component="p" margin="bottom">
          <RelativeDate date={date} />
        </Text>
        <Markdown>{summary}</Markdown>
        {bullets.length > 0 && (
          <Text component="ul" type="subtitle-1">
            {bullets.map((bullet) => {
              let content: ReactNode = <Markdown>{bullet}</Markdown>;
              if (asLink) {
                const id = toId(bullet);
                content = (
                  <Link as={`${asLink}#${id}`} href={`${href}#${id}`}>
                    {bullet}
                  </Link>
                );
              }

              return <li key={bullet}>{content}</li>;
            })}
          </Text>
        )}
        {href && (
          <LinkButton
            as={asLink}
            href={href}
            theme="secondary"
            className={styles.button}
          >
            <TextIconSpacing icon={<KeyboardArrowRightSVGIcon />} iconAfter>
              Read More
            </TextIconSpacing>
          </LinkButton>
        )}
      </TextContainer>
      {!isLast && <Divider />}
    </>
  );
};

export default Post;
