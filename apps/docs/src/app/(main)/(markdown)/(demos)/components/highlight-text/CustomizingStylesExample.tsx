/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HighlightText,
  type HighlightTextComponentProps,
} from "@react-md/core/typography/HighlightText";
import { HighlightTextMark } from "@react-md/core/typography/HighlightTextMark";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function CustomizingStylesExample(): ReactElement {
  return (
    <Typography>
      <HighlightText query="lit" highlight={Highlight}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget metus
        ut mi mattis dapibus. Praesent interdum sapien ut posuere convallis.
        Donec et tristique ex. Aliquam erat volutpat. Donec sit amet dui
        egestas, tempus quam id, hendrerit risus. Nullam tincidunt quam ut dui
        aliquet ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed rhoncus, purus vitae tincidunt placerat, quam diam lobortis
        magna, et aliquam ante diam id nunc. Cras blandit leo eu nisi elementum,
        nec gravida ligula pharetra. Etiam molestie luctus orci, vel hendrerit
        lacus eleifend ut. Nullam placerat dolor ac mi congue, non auctor metus
        consectetur. Ut pretium mollis vulputate.
      </HighlightText>
    </Typography>
  );
}

const USE_DEFAULT = false;

function Highlight(props: HighlightTextComponentProps): ReactElement {
  const { match, children } = props;
  if (USE_DEFAULT) {
    // this is the default implementation if you want to use it which is about
    // the same as:
    // ```tsx
    // import { Mark } from "@react-md/core/typography/Mark";
    //
    // return <Mark>{children}</Mark>
    // ```
    return <HighlightTextMark {...props} />;
  }

  // if you need to do some extra styling based on where the match occurs
  const { index, lastIndex, query, rawQuery, rawText } = match;

  // just use the default browser mark styles to see some highlights
  return <mark>{children}</mark>;
}
