import { Box } from "@react-md/core";
import { Form, TextArea } from "@react-md/form";
import type { ReactElement } from "react";

export default function SimpleTextAreas(): ReactElement {
  return (
    <Form>
      <Box stacked>
        <TextArea placeholder="Placeholder only" />
        <TextArea label="Label" placeholder="Placeholder" />
        <TextArea label="Label" defaultValue="Hello, world!" />
        <TextArea
          label="Error State"
          placeholder="Placeholder"
          defaultValue="Default value"
          error
        />
        <TextArea
          label="Read Only"
          placeholder="Placeholder"
          defaultValue="Default value"
          readOnly
        />
        <TextArea
          label="Disabled"
          placeholder="Placeholder"
          defaultValue="Default value"
          disabled
        />
      </Box>
    </Form>
  );
}
