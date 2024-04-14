import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { TextArea } from "@react-md/core/form/TextArea";
import { type ReactElement } from "react";

export default function ResizingTextAreaMaxRows(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextArea
        label="Label"
        placeholder="Placeholder..."
        maxRows={8}
        defaultValue={LOREM_IPSUM}
      />
      <TextArea
        label="Label"
        placeholder="Placeholder..."
        maxRows={8}
        theme="filled"
        defaultValue={LOREM_IPSUM}
      />
      <TextArea
        label="Label"
        placeholder="Placeholder..."
        maxRows={8}
        theme="underline"
        defaultValue={LOREM_IPSUM}
      />
    </Form>
  );
}

const LOREM_IPSUM = `Duis vehicula risus quis urna varius ultrices. Cras id ipsum sed mauris sollicitudin feugiat at eget erat. Sed sed magna sed risus ornare ullamcorper. Curabitur vehicula lorem ante, vel facilisis nunc pulvinar quis. Duis gravida, purus at consequat scelerisque, libero est eleifend sem, ac aliquet dolor ex vitae arcu. Nam at dignissim orci. Nulla posuere sollicitudin malesuada. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam at libero mi. Ut a lorem at leo euismod ultricies.

Etiam nisi tellus, accumsan ut leo vel, iaculis feugiat ligula. Nullam congue lorem non lorem maximus porta. Pellentesque nunc magna, tincidunt consectetur maximus vel, euismod in ligula. Duis quis metus ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer dapibus laoreet tincidunt. Vestibulum at erat eu dui convallis cursus. Sed sagittis ut nibh at feugiat. Duis vitae arcu eget risus mattis placerat. Donec eu metus a lorem sollicitudin sollicitudin id nec odio. Curabitur purus urna, vulputate at bibendum id, blandit ut arcu. Vestibulum enim ante, porta et aliquam id, pellentesque et augue.
`;
