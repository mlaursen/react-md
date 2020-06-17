import React, { FC, ReactNode } from "react";
import { Divider } from "@react-md/divider";
import { TextIconSpacing } from "@react-md/icon";
import { KeyboardArrowRightSVGIcon } from "@react-md/material-icons";
import { Text, TextContainer } from "@react-md/typography";

import Heading from "components/Heading";
import LinkButton from "components/LinkButton";
import { Markdown } from "components/Markdown";
import RelativeDate from "components/RelativeDate";
import { toId } from "utils/toTitle";
import Link from "components/Link";

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

const href = "/blog/[id]";

const Post: FC<PostProps> = ({
  title,
  date,
  readMore,
  summary,
  bullets,
  isLast,
}) => {
  const asLink = `/blog/${readMore}`;

  return (
    <>
      <TextContainer className={styles.container}>
        <Heading id={toId(title)} level={5} margin="top" component="h3">
          {title}
        </Heading>
        <Text color="secondary" type="body-2" component="p" margin="bottom">
          <RelativeDate date={date} />
        </Text>
        {/* hackily converts "lists" into bulleted lists without it be converted to the bullets part of a post */}
        <Markdown>{summary.replace(/^1. /gm, "- ")}</Markdown>
        {bullets.length > 0 && (
          <Text component="ul" type="subtitle-1">
            {bullets.map((bullet) => {
              let content: ReactNode = bullet;
              if (readMore) {
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
        {readMore && (
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
