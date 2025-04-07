import { HighlightText } from "@react-md/core/typography/HighlightText";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

export default function FirstMatchOnlyExample(): ReactElement {
  return (
    <Typography>
      <HighlightText query="it" firstMatchOnly>
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
