import React, { FunctionComponent, ReactNode } from "react";
// import { SEPARATOR } from "./componentRenderer";

const START_TOKEN = "{";
const END_TOKEN = "}";
const TOKEN_REGEX = new RegExp(`${START_TOKEN}|${END_TOKEN}`);

function matchBraces(s: string, count: number = 0): string {
  const match = s.match(TOKEN_REGEX);
  // console.log("s:", s);
  // console.log("match:", match);
  if (!match) {
    return s;
  }

  const i = (match.index || 0) + 1;
  if (match[0] === END_TOKEN) {
    if (count === 1) {
      // console.log("HERE");
      return s.substring(0, i);
    }

    // console.log("count:", count);
    return s.substring(0, i);
  }

  return s.substring(0, i) + matchBraces(s.substring(i), count + 1);
}

const MarkdownToReact: FunctionComponent<{ children: string }> = ({
  children,
}) => {
  if (!children) {
    return null;
  } else if (children[0] !== START_TOKEN) {
    throw new Error(
      `First character in markdown is not the required start token: "${START_TOKEN}"`
    );
  }

  console.log("children:", children);
  let remaining = children.substring(1, children.length - 1);
  const components: ReactNode[] = [];
  while (remaining.length) {
    const nextToken = remaining.match(TOKEN_REGEX);
    if (!nextToken) {
      // console.log("BAD");
      return null;
    }

    const result = matchBraces(remaining);
    // console.log("result:", result);
    // console.log("matchBraces(result):", matchBraces(result));
    // if (nextToken[0] === END_TOKEN) {
    //   const value = remaining.substring(0, nextToken.index);
    //   console.log("value:", value);
    // } else {
    //   let prefix = remaining.substring(0, nextToken.index);
    //   console.log("NOOO");
    // }
    // console.log("nextToken:", nextToken);
    return null;
  }
  // const parts = children
  //   .split(SEPARATOR)
  //   .filter(Boolean)
  //   .map(s => s.replace(/\\"/g, '"'));
  // // .map(s => JSON.parse(s));
  // console.log("parts:", parts);
  return null;
};

export default MarkdownToReact;
