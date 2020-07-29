import React, { ReactElement } from "react";
import { Divider } from "@react-md/divider";
import { Text, TextContainer } from "@react-md/typography";

import Post, { BlogPost } from "./Post";

export interface BlogProps {
  children: string;
}

export default function Blog({ children }: BlogProps): ReactElement {
  const posts = children
    .split(/\r?\n---\r?\n/)
    .reduce<BlogPost[]>((posts, postMarkdown) => {
      const titleMatch = postMarkdown.match(/^Title: (.+)$/m);
      const dateMatch = postMarkdown.match(/^Date: (\d{2}\/\d{2}\/\d{4})$/m);
      const readMoreMatch = postMarkdown.match(/^Read More: (.+)$/m);
      const summaryMatch = postMarkdown.match(/^Summary:(<!-- bullets -->)?$/m);
      if (!titleMatch) {
        throw new Error("A blog post must have a title.");
      }

      if (!dateMatch) {
        throw new Error("A blog post must have a published date.");
      }

      if (!summaryMatch || typeof summaryMatch.index !== "number") {
        throw new Error("A blog must have a summary.");
      }

      const [, title] = titleMatch;
      const [, date] = dateMatch;
      const readMore = readMoreMatch?.[1] || null;
      let summary = postMarkdown
        .substring(summaryMatch.index + summaryMatch[0].length)
        .trim();

      const bulletsMatch =
        summaryMatch[0].includes("<!-- bullets -->") && summary.match(/^- /m);

      let bullets: string[] = [];
      if (bulletsMatch && bulletsMatch.index) {
        bullets = summary
          .substring(bulletsMatch.index)
          .split("- ")
          .filter(Boolean);
        summary = summary.substring(0, bulletsMatch.index - 1);
      }

      posts.push({
        title,
        date,
        readMore,
        summary,
        bullets,
      });

      return posts;
    }, []);

  return (
    <>
      <TextContainer>
        {({ className }) => (
          <Text
            id="latest-news"
            align="center"
            type="headline-4"
            component="h2"
            className={className}
          >
            The latest news about react-md
          </Text>
        )}
      </TextContainer>
      <Divider />
      {posts.map((post, i) => (
        <Post key={post.date} {...post} isLast={i === posts.length - 1} />
      ))}
    </>
  );
}
