import { Comment } from "typedoc/dist/lib/models";
import { formatCode } from "./code";

/**
 * Parses a typedoc comment string and formats the comment with a few additional rules. If there
 * are any code blocks within the comment, each code block will be extracted, formatted with
 * perttier, and returned into the comment in the same place.
 *
 * @param comment The comment to parse and format.
 */
export function parseComment(comment: Comment | string | undefined): string {
  if (!comment) {
    return "";
  }

  let commentString = "";
  if (typeof comment !== "string") {
    const { text = "", shortText = "" /*, tags = []*/ } = comment;
    commentString = `${shortText}${text}`;
  }

  let prefix = commentString;
  let codeBlock = "";
  let suffix = "";

  const [codeBlockStart = "", codeType = ""] = commentString.match(/```(\w*)\r?\n/) || [];
  if (codeBlockStart) {
    const [codeBlockEnd = ""] = commentString.match(/```\r?\n/) || [];
    if (!codeBlockEnd) {
      throw new Error(`Found a code block that does not have an ending tag.`);
    }

    const codeBlockStartIndex = commentString.indexOf(codeBlockStart);
    const remainingComment = commentString.substring(codeBlockStartIndex + codeBlockStart.length);
    const codeEndIndex = remainingComment.indexOf(codeBlockEnd);

    prefix = commentString.substring(0, codeBlockStartIndex);
    codeBlock = formatCode(remainingComment.substring(0, codeEndIndex), codeType);
    codeBlock = `${codeBlockStart}${codeBlock}${codeBlockEnd}`;
    suffix = remainingComment.substring(codeEndIndex + codeBlockEnd.length);

    if (suffix) {
      suffix = parseComment(commentString);
    }
  }

  // Remove newlines that occur within sentences since the typedoc comments keep
  // newlines even when they are for max-length issues instead of in code blocks
  prefix = prefix.replace(/(\w)\r?\n(\w)?/g, "$1 $2");

  return `${prefix}${codeBlock}${suffix}`;
}
